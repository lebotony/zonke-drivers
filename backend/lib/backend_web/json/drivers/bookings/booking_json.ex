defmodule BackendWeb.Bookings.BookingJSON do
  def index(%{bookings: bookings}) do
    for(booking <- bookings, do: show(%{booking: booking}))
  end

  def show(%{booking: booking}) do
    Map.take(booking, [
      :id,
      :status,
      :note,
      :booked_date,
      :booked_time,
      :inserted_at,
      :updated_at
    ])
  end
end
