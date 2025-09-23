defmodule Backend.Vehicles.Queries.VehicleDriverBy do
  alias Backend.Vehicles.VehicleDriver
  import Ecto.Query

  def base_query do
    from(vd in VehicleDriver,
      as: :vehicle_driver,
    )
  end

  def by_id(query, id) do
    where(query, [vehicle_driver: vd], vd.id == ^id)
  end

  def by_vehicle_owner(query, id) do
    query
    |> join(:inner, [vehicle_driver: vd], v in assoc(vd, :vehicle))
    |> where([vehicle: v], v.business_profile_id == ^id)
  end

  def by_driver(query, id) do
    query
    |> join(:inner, [vehicle_driver: vd], d in assoc(vd, :driver))
    |> where([driver: d], d.business_profile_id == ^id)
  end
end
