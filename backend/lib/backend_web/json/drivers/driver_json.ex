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
      :booking_count,
      :email,
      :licences,
      :platforms,
      :first_name,
      :last_name,
      :username,
      :location,
      :user_id,
      :total_accidents,
      :previous_vehicles,
      :inserted_at,
      :updated_at
    ])
    |> Map.merge(%{rating: (:rand.uniform(39) + 10) / 10})
  end
end
