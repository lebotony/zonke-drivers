defmodule BackendWeb.Drivers.DriverJSON do
  def index(%{drivers: drivers, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(driver <- drivers, do: show(%{driver: driver}))
    }
  end

  def index(%{drivers: drivers}) do
    for(driver <- drivers, do: show(%{driver: driver}))
  end

  def show(%{driver: driver}) do
    Map.take(driver, [
      :id,
      :description,
      :location,
      :location_options,
      :paused_at,
      :price_range,
      :price_fixed,
      :age,
      :experience,
      :rating,
      :booking_count,
      :inserted_at,
      :updated_at
    ])
  end
end
