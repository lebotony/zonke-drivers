defmodule Backend.Applications.VehiclePurchaseInterests do
  alias Ecto.Multi
  alias Backend.Applications.VehiclePurchaseInterest
  alias Backend.Accounts.User
  alias Backend.Vehicles.Vehicle
  alias Backend.Notifications.PushNotification
  alias Backend.{Repo, PaginateHelper}

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    case interest_exists(user_id, params.vehicle_id) do
      false ->
        updated_params = Map.put(params, :user_id, user_id)

        Multi.new()
        |> Multi.insert(:interest, VehiclePurchaseInterest.changeset(%VehiclePurchaseInterest{}, updated_params))
        |> Multi.run(:push_notification, fn _repo, %{interest: interest} ->
          interest = Repo.preload(interest, [:vehicle, :user])
          vehicle = interest.vehicle
          vehicle_owner_id = vehicle.user_id
          buyer = interest.user

          PushNotification.enqueue_push(%{
            recipient_id: vehicle_owner_id,
            notifier_id: user_id,
            title: "New Purchase Interest",
            body: "#{buyer.first_name} #{buyer.last_name} is interested in buying your #{vehicle.brand} #{vehicle.model}",
            data: %{
              type: "purchase_interest",
              vehicle_id: interest.vehicle_id,
              interest_id: interest.id,
              deep_link: "zonkedrivers://interestedBuyers?vehicle_id=#{interest.vehicle_id}"
            }
          })

          {:ok, interest}
        end)
        |> Repo.transaction()
        |> case do
          {:ok, %{interest: interest}} -> {:ok, interest}
          {:error, :interest, changeset, _} -> {:error, changeset}
          {:error, _step, reason, _} -> {:error, reason}
        end

      true ->
        {:ok, :interest_exists}
    end
  end

  defp interest_exists(user_id, vehicle_id) do
    from(vpi in VehiclePurchaseInterest,
      where: vpi.user_id == ^user_id and vpi.vehicle_id == ^vehicle_id
    )
    |> Repo.exists?()
  end

  def get_vehicle_purchase_interests(params) do
    user_query = from(u in User, preload: [:asset])

    data =
      from(vpi in VehiclePurchaseInterest,
        where: vpi.vehicle_id == ^params.vehicle_id,
        order_by: [desc: vpi.inserted_at],
        preload: [user: ^user_query]
      )
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data.entries, PaginateHelper.prep_paginate(data)}
  end

  def set_interests_seen(vehicle_id) do
    {count, _} =
      from(vpi in VehiclePurchaseInterest,
        where: vpi.vehicle_id == ^vehicle_id,
        where: vpi.seen == false,
        update: [set: [seen: true]]
      )
      |> Repo.update_all([])

    {:ok, count}
  end

  def delete(%VehiclePurchaseInterest{} = interest) do
    Repo.delete(interest)
  end
end
