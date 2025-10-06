defmodule BackendWeb.Vehicles.VehicleDriverJSON do
  alias BackendWeb.Drivers.DriverJSON
  alias BackendWeb.Vehicles.VehicleJSON

  def index(%{vehicle_drivers: vehicle_drivers, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(vehicle_driver <- vehicle_drivers, do: show(%{vehicle_driver: vehicle_driver}))
    }
  end

  def show(%{vehicle_driver: vehicle_driver}) do
    %{
      id: vehicle_driver.id,
      driver: DriverJSON.show(%{driver: vehicle_driver.driver}),
      vehicle: VehicleJSON.show(%{vehicle: vehicle_driver.vehicle}),
      asset_url: vehicle_driver.asset_url,
      inserted_at: vehicle_driver.inserted_at,
      updated_at: vehicle_driver.updated_at,
      first_name: vehicle_driver.first_name,
      last_name: vehicle_driver.last_name
    }
    |> Map.merge(%{rating: (:rand.uniform(39) + 10) / 10})
  end
end
