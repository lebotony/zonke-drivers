defmodule Backend.Vehicles.Payments do
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Vehicles.Payment
  alias Backend.Vehicles.Queries.PaymentBy
  alias Backend.Drivers.{Drivers, Driver}
  alias Backend.Drivers.Rating

  import Ecto.Query

  # defdelegate authorize(action, params, session), to: Policy

  def create(params) do
    case %Payment{}
         |> Payment.changeset(params)
         |> Repo.insert() do
      {:ok, payment} ->
        driver_id =
          payment
          |> Repo.preload(:vehicle_driver)
          |> Map.get(:vehicle_driver)
          |> Map.get(:driver_id)

        update_driver_rating(driver_id)

        {:ok, payment}

      {:error, reason} ->
        {:error, reason}
    end
  end

  def update_driver_rating(driver_id) do
    rating_map = Rating.compute_driver_rating(driver_id)
    {:ok, driver} = Drivers.get_driver(driver_id)

    driver
    |> Driver.changeset(%{rating: rating_map.driver_rating})
    |> Repo.update()
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

  def get_payments(%{vehicle_driver_id: vehicle_driver_id} = params) do
    data =
      PaymentBy.base_query()
      |> PaymentBy.by_vehicle_driver(vehicle_driver_id)
      |> order_by([payment: p], desc: p.inserted_at)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_payments(_params), do: {:error, :vehicle_driver_id_required}

  defp format_payment(%Payment{} = payment), do: {:ok, payment}
  defp format_payment(nil), do: {:error, :not_found}
end
