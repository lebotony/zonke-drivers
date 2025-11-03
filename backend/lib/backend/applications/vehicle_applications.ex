defmodule Backend.Applications.VehicleApplications do
  alias Ecto.Multi
  alias Backend.Applications.VehicleApplication
  alias Backend.Notifications.Notifications
  alias Backend.Applications.Queries.VehicleApplicationBy
  alias Backend.Drivers.Drivers
  alias Backend.{Repo, PaginateHelper}

  import Ecto.Query

  def create(params) do
    %VehicleApplication{}
    |> VehicleApplication.changeset(params)
    |> Repo.insert()
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
    data =
      VehicleApplicationBy.base_query()
      |> VehicleApplicationBy.by_vehicle(params.vehicle_id)
      |> build_sort_all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    applications_with_drivers =
      Enum.map(data.entries, fn vehicle_application ->
        {:ok, driver} = Drivers.get_driver(vehicle_application.driver_id, :public)
        Map.put(vehicle_application, :driver, driver)
      end)

    {:ok, applications_with_drivers, PaginateHelper.prep_paginate(data)}
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

  def build_sort_all(query) do
    query
    |> order_by(
      [vehicle_applications: va],
      [
        fragment(
          "CASE
          WHEN ? = ? THEN 1
          WHEN ? = ? THEN 2
          WHEN ? = ? THEN 3
        END",
          va.status,
          "pending",
          va.status,
          "accepted",
          va.status,
          "rejected"
        ),
        desc: va.inserted_at
      ]
    )
  end

  defp format_vehicle_application(%VehicleApplication{} = vehicle_application),
    do: {:ok, vehicle_application}

  defp format_vehicle_application(nil), do: {:error, :not_found}
end
