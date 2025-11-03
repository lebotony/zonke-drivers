defmodule BackendWeb.Vehicles.VehicleDriverJSON do
  alias BackendWeb.Drivers.DriverJSON

  def index(%{vehicle_drivers: vehicle_drivers, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(vehicle_driver <- vehicle_drivers, do: show(%{vehicle_driver: vehicle_driver}))
    }
  end

  def index(%{vehicle_drivers: vehicle_drivers}) do
    for(vehicle_driver <- vehicle_drivers, do: show(%{vehicle_driver: vehicle_driver}))
  end

  def show(%{vehicle_driver: vehicle_driver}) do
    %{
      id: vehicle_driver.id,
      driver: vehicle_driver.driver,
      inserted_at: vehicle_driver.inserted_at,
      updated_at: vehicle_driver.updated_at
    }
  end
end
