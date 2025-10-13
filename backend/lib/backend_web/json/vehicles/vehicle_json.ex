defmodule BackendWeb.Vehicles.VehicleJSON do
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
    Map.take(vehicle, [
      :id,
      :description,
      :name,
      :make,
      :model,
      :mileage,
      :price_range,
      :price_fixed,
      :active,
      :user_id,
      :type,
      :brand,
      :manual,
      :fuel_type,
      :engine_capacity,
      :passengers,
      :model_year,
      :rating,
      :inserted_at,
      :updated_at
    ])
  end
end
