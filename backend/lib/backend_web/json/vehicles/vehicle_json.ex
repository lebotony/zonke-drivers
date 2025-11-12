defmodule BackendWeb.Vehicles.VehicleJSON do
  alias BackendWeb.Vehicles.VehicleDriverJSON
  alias BackendWeb.Applications.VehicleApplicationJSON
  alias BackendWeb.Assets.AssetJSON
  alias BackendWeb.UserJSON

  def index(%{vehicles: vehicles, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(vehicle <- vehicles, do: show(%{vehicle: vehicle}))
    }
  end

  def index(%{vehicles: vehicles}) do
    for(vehicle <- vehicles, do: show(%{vehicle: vehicle}))
  end

  def show(%{vehicle: vehicle}) do
    vehicle_drivers =
      if Ecto.assoc_loaded?(vehicle.vehicle_drivers) do
        VehicleDriverJSON.index(%{vehicle_drivers: vehicle.vehicle_drivers})
      else
        []
      end

    user =
      if is_map(vehicle.user) do
        UserJSON.show(%{user: vehicle.user})
      else
        nil
      end

    %{
      id: vehicle.id,
      model: vehicle.model,
      description: vehicle.description,
      mileage: vehicle.mileage,
      active: vehicle.active,
      type: vehicle.type,
      brand: vehicle.brand,
      manual: vehicle.manual,
      fuel_type: vehicle.fuel_type,
      engine_capacity: vehicle.engine_capacity,
      passengers: vehicle.passengers,
      model_year: vehicle.model_year,
      price_fixed: vehicle.price_fixed,
      unseen_applications_count: Map.get(vehicle, :unseen_applications_count),
      user: user,
      inserted_at: vehicle.inserted_at,
      updated_at: vehicle.updated_at,
      asset: AssetJSON.show(%{asset: vehicle.asset}),
      vehicle_drivers: vehicle_drivers
    }
  end
end
