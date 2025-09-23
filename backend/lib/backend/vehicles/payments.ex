defmodule Backend.Vehicles.Payments do
  alias Backend.Repo
  alias Backend.Vehicles.{Payment, VehicleDriver}

  import Ecto.Query

  # defdelegate authorize(action, params, session), to: Policy

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    %Payment{}
    |> Payment.changeset(params)
    |> Repo.insert()
  end

  def update(%Payment{} = payment, params) do
    payment
    |> Payment.changeset(params)
    |> Repo.update()
  end

  def delete(%Payment{id: id} = payment) do
    Repo.delete(payment)
  end

  def get_payment(id) do
    Repo.get_by(Payment, id: id)
    |> format_payment()
  end

  def get_payments(params, :vehicle_owner) do
    data =
      VehicleDriverBy.base_query()
      |> VehicleDriverBy.by_vehicle_owner(params.business_profile_id)
      |> Repo.all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_payments(params, :driver) do
    data =
      VehicleDriverBy.base_query()
      |> VehicleDriverBy.by_driver(params.business_profile_id)
      |> Repo.all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  defp format_payment(%Payment{} = payment), do: {:ok, payment}
  defp format_payment(nil), do: {:error, :not_found}
end
