defmodule Backend.Applications.VehiclePurchaseInterests do
  alias Backend.Applications.VehiclePurchaseInterest
  alias Backend.Accounts.User
  alias Backend.{Repo, PaginateHelper}

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    case interest_exists(user_id, params.vehicle_id) do
      false ->
        updated_params = Map.put(params, :user_id, user_id)

        %VehiclePurchaseInterest{}
        |> VehiclePurchaseInterest.changeset(updated_params)
        |> Repo.insert()

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
    data =
      from(vpi in VehiclePurchaseInterest,
        where: vpi.vehicle_id == ^params.vehicle_id,
        order_by: [desc: vpi.inserted_at]
      )
      |> Repo.paginate(PaginateHelper.prep_params(params))

    interests_with_users =
      Enum.map(data.entries, fn interest ->
        user =
          from(u in User,
            where: u.id == ^interest.user_id,
            preload: [:asset]
          )
          |> Repo.one()

        Map.put(interest, :user, user)
      end)

    {:ok, interests_with_users, PaginateHelper.prep_paginate(data)}
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
