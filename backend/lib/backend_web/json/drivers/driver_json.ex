defmodule BackendWeb.Drivers.DriverJSON do
  alias BackendWeb.UserJSON

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
    user =
      if Ecto.assoc_loaded?(driver.user) do
        UserJSON.show(%{user: driver.user})
      else
        %{}
      end

    %{
      id: driver.id,
      description: driver.description,
      paused_at: driver.paused_at,
      dob: driver.dob,
      experience: driver.experience,
      booking_count: driver.booking_count,
      email: driver.email,
      licences: driver.licences,
      location: driver.location,
      platforms: driver.platforms,
      first_name: driver.first_name,
      last_name: driver.last_name,
      username: driver.username,
      user_id: driver.user_id,
      total_accidents: driver.total_accidents,
      previous_vehicles: driver.previous_vehicles,
      rating: driver.rating,
      inserted_at: driver.inserted_at,
      updated_at: driver.updated_at,
      asset_url: driver.asset_url,
      user: user
    }
  end
end
