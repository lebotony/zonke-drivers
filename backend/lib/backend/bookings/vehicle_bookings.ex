defmodule Backend.Bookings.VehicleBookings do
  alias Ecto.Multi
  alias Backend.Bookings.VehicleBooking
  alias Backend.Notifications.Notifications
  alias Backend.Bookings.Queries.VehicleBookingBy
  alias Backend.{Repo, PaginateHelper}

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    Multi.new()
    |> Multi.insert(
      :vehicle_booking,
      VehicleBooking.changeset(%VehicleBooking{}, params)
    )
    |> Multi.run(:notification, fn _repo, %{vehicle_booking: vehicle_booking} ->
      Notifications.create(vehicle_booking, user_id, %{booking: :created})
    end)
    |> Repo.transaction()
    |> case do
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
      {:ok, %{vehicle_booking: vehicle_booking}} -> {:ok, vehicle_booking}
    end
  end

  def update(%VehicleBooking{} = vehicle_booking, params) do
    Multi.new()
    |> Multi.update(
      :vehicle_booking,
      VehicleBooking.changeset(vehicle_booking, params)
    )
    |> Multi.run(:notification, fn _repo, %{vehicle_booking: vehicle_booking} ->
      Notifications.create(vehicle_booking, vehicle_booking.user_id, %{booking: :updated})
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{vehicle_booking: vehicle_booking}} -> {:ok, vehicle_booking}
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
    end
  end

  def delete(%VehicleBooking{} = vehicle_booking) do
    Multi.new()
    |> Multi.delete(:vehicle_booking, vehicle_booking)
    |> Multi.run(:notification, fn _repo, %{vehicle_booking: vehicle_booking} ->
      Notifications.create(vehicle_booking, vehicle_booking.user_id, %{booking: :deleted})
    end)
    |> Repo.transaction()
    |> case do
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
      {:ok, _booking} -> {:ok, _booking}
    end
  end

  def get_vehicle_booking(id) do
    Repo.get_by(VehicleBooking, id: id)
    |> format_vehicle_booking()
  end

  def get_vehicle_bookings(params, %{user_id: user_id}, :driver) do
    data =
      VehicleBookingBy.base_query()
      |> VehicleBookingBy.by_driver(user_id)
      |> build_sort_all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_vehicle_bookings(params, %{user_id: user_id}, :owner) do
    data =
      VehicleBookingBy.base_query()
      |> VehicleBookingBy.by_vehicle_owner(user_id)
      |> build_sort_all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  # def get_pending_vehicle_bookings(profile_id) do
  #   VehicleBookingBy.base_query()
  #   |> VehicleBookingBy.by_pending_status(profile_id)
  #   |> Repo.all()
  # end

  # def get_accepted_vehicle_bookings(profile_id) do
  #   VehicleBookingBy.base_query()
  #   |> VehicleBookingBy.by_active_status(profile_id)
  #   |> Repo.all()
  # end

  # def get_rejected_vehicle_bookings(profile_id) do
  #   VehicleBookingBy.base_query()
  #   |> VehicleBookingBy.by_delivered_status(profile_id)
  #   |> Repo.all()
  # end

  def build_sort_all(query) do
    query
    |> order_by(
      [vehicle_booking: vb],
      [
        fragment(
          "CASE
          WHEN ? = ? THEN 1
          WHEN ? = ? THEN 2
          WHEN ? = ? THEN 3
        END",
          vb.status,
          "pending",
          vb.status,
          "accepted",
          vb.status,
          "rejected"
        ),
        desc: vb.inserted_at
      ]
    )
  end

  defp format_vehicle_booking(%VehicleBooking{} = vehicle_booking), do: {:ok, vehicle_booking}
  defp format_vehicle_booking(nil), do: {:error, :not_found}
end
