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
      # :rating,
      :inserted_at,
      :updated_at
    ])
    # |> Map.merge(%{rating: (:rand.uniform(39) + 10) / 10})
  end
end
