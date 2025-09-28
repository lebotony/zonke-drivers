defmodule BackendWeb.Bookings.VehicleBookingController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Bookings.VehicleBookings

  def index(conn, params, session) do
    with vehicle_bookings <- VehicleBookings.get_vehicle_bookings(params, session, :driver) do
      render(conn, :index, vehicle_bookings: vehicle_bookings)
    end
  end

  def index(conn, params, session) do
    with vehicle_bookings <- VehicleBookings.get_vehicle_bookings(params, session, :owner) do
      render(conn, :index, vehicle_bookings: vehicle_bookings)
    end
  end

  def create(conn, params, session) do
    with {:ok, vehicle_booking} <- VehicleBookings.create(params, session) do
      render(conn, :show, vehicle_booking: vehicle_booking)
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, vehicle_booking} <- VehicleBookings.get_vehicle_booking(id) do
      render(conn, :show, vehicle_booking: vehicle_booking)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, vehicle_booking} <- VehicleBookings.get_vehicle_booking(id),
         {:ok, vehicle_booking} <- VehicleBookings.update(vehicle_booking, params) do
      render(conn, :show, vehicle_booking: vehicle_booking)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, vehicle_booking} <- VehicleBookings.get_vehicle_booking(id),
         {:ok, _vehicle_booking} <- VehicleBookings.delete(vehicle_booking) do
      json(conn, :ok)
    end
  end
end
