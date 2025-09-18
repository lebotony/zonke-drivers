defmodule BackendWeb.Bookings.BookingController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Bookings.Bookings

  def index(conn, %{business_profile_id: profile_id} = params, session) do
    with bookings <- Bookings.get_all_bookings(profile_id) do
      render(conn, :index, bookings: bookings)
    end
  end

  def create(conn, %{business_profile_id: profile_id} = params, session) do
    with {:ok, booking} <- Bookings.create(params, session) do
      render(conn, :show, booking: booking)
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, booking} <- Bookings.get_booking(id) do
      render(conn, :show, booking: booking)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, booking} <- Bookings.get_booking(id),
         {:ok, booking} <- Bookings.update(booking, params) do
      render(conn, :show, booking: booking)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, booking} <- Bookings.get_booking(id),
         {:ok, _booking} <- Bookings.delete(booking) do
      json(conn, :ok)
    end
  end
end
