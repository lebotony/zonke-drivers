defmodule Backend.Vehicles.Queries.VehicleBy do
  alias Backend.Vehicles.Vehicle
  import Ecto.Query

  def base_query do
    from(v in Vehicle,
      as: :vehicle,
      join: bp in assoc(v, :business_profile),
      as: :business_profile
    )
  end

  def by_id(query, id) do
    where(query, [vehicle: v], v.id == ^id)
  end

  def by_business_profile(query, id) do
    where(query, [vehicle: v], v.business_profile_id == ^id)
  end

  def by_active_status(query) do
    where(
      query,
      [vehicle: v, business_profile: bp],
      v.active == true and not bp.disabled
    )
  end
end
