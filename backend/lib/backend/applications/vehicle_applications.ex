defmodule Backend.Applications.VehicleApplications do
  alias Ecto.Multi
  alias Backend.Applications.VehicleApplication
  alias Backend.Notifications.Notifications
  alias Backend.Applications.Queries.VehicleApplicationBy
  alias Backend.Drivers.{Drivers, Driver}
  alias Backend.Vehicles.{Vehicle, VehicleDriver}
  alias Backend.Accounts.User
  alias Backend.Notifications.PushNotification
  alias Backend.{Repo, PaginateHelper}

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    case get_user_driver(user_id) do
      {:ok, driver} ->
        case driver_application_exists(driver.id, params.vehicle_id) do
          false ->
            updated_params = Map.put(params, :driver_id, driver.id)

            Multi.new()
            |> Multi.insert(:application, VehicleApplication.changeset(%VehicleApplication{}, updated_params))
            |> Multi.run(:push_notification, fn _repo, %{application: application} ->
              application = Repo.preload(application, vehicle: :user)
              vehicle = application.vehicle
              vehicle_owner = vehicle.user
              driver_user = Repo.get(User, user_id)

              PushNotification.enqueue_push(%{
                recipient_id: vehicle_owner.id,
                notifier_id: user_id,
                title: "New Driver Application",
                body: "#{driver_user.first_name} #{driver_user.last_name} applied to drive your #{vehicle.brand} #{vehicle.model}",
                data: %{
                  type: "vehicle_application",
                  vehicle_id: application.vehicle_id,
                  application_id: application.id,
                  deep_link: "zonkedrivers://(tabs)/manage?tab=applications&vehicle_id=#{application.vehicle_id}"
                }
              })

              {:ok, application}
            end)
            |> Repo.transaction()
            |> case do
              {:ok, %{application: application}} -> {:ok, application}
              {:error, :application, changeset, _} -> {:error, changeset}
              {:error, _step, reason, _} -> {:error, reason}
            end

          true ->
            {:ok, :application_exists}
        end

      {:error, :not_found} ->
        {:error, :no_driver_profile}
    end
  end

  defp get_user_driver(user_id) do
    from(d in Driver,
      as: :driver,
      where: d.user_id == ^user_id
    )
    |> Repo.one()
    |> Drivers.format_driver()
  end

  defp driver_application_exists(driver_id, vehicle_id) do
    exists =
      VehicleApplicationBy.base_query()
      |> VehicleApplicationBy.by_driver(driver_id)
      |> VehicleApplicationBy.by_vehicle(vehicle_id)
      |> Repo.exists?()
  end

  def get_application_by_vehicle_driver(vehicle_id, driver_id) do
    VehicleApplicationBy.base_query()
    |> VehicleApplicationBy.by_vehicle(vehicle_id)
    |> VehicleApplicationBy.by_driver(driver_id)
    |> Repo.one()
    |> format_vehicle_application()
  end

  def update(%VehicleApplication{} = vehicle_application, params) do
    vehicle_application
    |> VehicleApplication.changeset(params)
    |> Repo.update()
  end

  def delete(%VehicleApplication{} = vehicle_application) do
    Repo.delete(vehicle_application)
  end

  def get_vehicle_application(id) do
    Repo.get_by(VehicleApplication, id: id)
    |> format_vehicle_application()
  end

  def get_vehicle_applications(params) do
    driver_query = build_driver_preload_query()

    data =
      VehicleApplicationBy.base_query()
      |> VehicleApplicationBy.by_vehicle(params.vehicle_id)
      |> order_by([va], desc: va.inserted_at)
      |> preload(driver: ^driver_query)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data.entries, PaginateHelper.prep_paginate(data)}
  end

  defp build_driver_preload_query do
    subquery =
      from(vd in VehicleDriver,
        where: vd.driver_id == parent_as(:driver).id,
        select: %{
          previous_vehicles: count(vd.id),
          total_accidents: coalesce(sum(vd.accidents), 0)
        }
      )

    from(d in Driver,
      as: :driver,
      join: u in assoc(d, :user),
      as: :user,
      join: a in assoc(u, :asset),
      as: :asset,
      left_lateral_join: vd_stats in subquery(subquery),
      as: :vd_stats,
      on: true,
      select_merge: %{
        d
        | email: u.email,
          first_name: u.first_name,
          last_name: u.last_name,
          username: u.username,
          user_id: u.id,
          previous_vehicles: vd_stats.previous_vehicles,
          total_accidents: vd_stats.total_accidents,
          asset_filename: a.filename
      }
    )
  end

  def set_va_seen_true(va_id) do
    {count, _} =
      from(va in VehicleApplication,
        where: va.vehicle_id == ^va_id,
        where: va.seen == false,
        update: [set: [seen: true]]
      )
      |> Repo.update_all([])

    {:ok, count}
  end

  # def get_vehicle_applications(params, %{user_id: user_id}, :owner) do
  #   data =
  #     VehicleApplicationBy.base_query()
  #     |> VehicleApplicationBy.by_vehicle_owner(user_id)
  #     |> build_sort_all()
  #     |> Repo.paginate(PaginateHelper.prep_params(params))

  #   {:ok, data, PaginateHelper.prep_paginate(data)}
  # end

  # def get_pending_vehicle_applications(profile_id) do
  #   VehicleApplicationBy.base_query()
  #   |> VehicleApplicationBy.by_pending_status(profile_id)
  #   |> Repo.all()
  # end

  # def get_accepted_vehicle_applications(profile_id) do
  #   VehicleApplicationBy.base_query()
  #   |> VehicleApplicationBy.by_active_status(profile_id)
  #   |> Repo.all()
  # end

  # def get_rejected_vehicle_applications(profile_id) do
  #   VehicleApplicationBy.base_query()
  #   |> VehicleApplicationBy.by_delivered_status(profile_id)
  #   |> Repo.all()
  # end

  # def build_sort_all(query) do
  #   query
  #   |> order_by(
  #     [vehicle_applications: va],
  #     [
  #       fragment(
  #         "CASE
  #         WHEN ? = ? THEN 1
  #         WHEN ? = ? THEN 2
  #         WHEN ? = ? THEN 3
  #       END",
  #         va.status,
  #         "pending",
  #         va.status,
  #         "accepted",
  #         va.status,
  #         "rejected"
  #       ),
  #       desc: va.inserted_at
  #     ]
  #   )
  # end

  defp format_vehicle_application(%VehicleApplication{} = vehicle_application),
    do: {:ok, vehicle_application}

  defp format_vehicle_application(nil), do: {:error, :not_found}
end
