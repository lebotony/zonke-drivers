defmodule Backend.Services.Queries.ServiceBy do
  alias Backend.Services.Service
  import Ecto.Query

  def base_query do
    from(s in Service,
      as: :service,
      join: bp in assoc(s, :business_profile),
      as: :business_profile
    )
  end

  def by_id(query, id) do
    where(query, [service: s], s.id == ^id)
  end

  def by_business_profile(query, id) do
    where(query, [service: s], s.business_profile_id == ^id)
  end

  def by_active_status(query) do
    where(
      query,
      [service: s, business_profile: bp],
      is_nil(s.paused_at) and not s.draft and not bp.disabled
    )
  end
end
