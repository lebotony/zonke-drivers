defmodule BackendWeb.Bookings.VehicleBookingJSON do
  def index(%{vehicle_bookings: vehicle_bookings, paginate: paginate}) do
    %{
      paginate: paginate,
      data:
        for(vehicle_booking <- vehicle_bookings, do: show(%{vehicle_booking: vehicle_booking}))
    }
  end

  def index(%{vehicle_bookings: vehicle_bookings}) do
    for(vehicle_booking <- vehicle_bookings, do: show(%{vehicle_booking: vehicle_booking}))
  end

  def show(%{vehicle_booking: vehicle_booking}) do
    Map.take(vehicle_booking, [
      :id,
      :status,
      :note,
      :booked_date,
      :price_fixed,
      :duration,
      :inserted_at,
      :updated_at
    ])
  end
end
