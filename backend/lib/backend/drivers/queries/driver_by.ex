defmodule Backend.Drivers.Queries.DriverBy do
  alias Backend.Drivers.Driver
  import Ecto.Query

  def base_query do
    from(d in Driver,
      as: :driver,
      join: bp in assoc(d, :business_profile),
      as: :business_profile
    )
  end

  def by_id(query, id) do
    where(query, [driver: d], d.id == ^id)
  end

  def by_business_profile(query, id) do
    where(query, [driver: d], d.business_profile_id == ^id)
  end

  def by_active_status(query) do
    where(
      query,
      [driver: d, business_profile: bp],
      is_nil(d.paused_at) and not d.draft and not bp.disabled
    )
  end
end
