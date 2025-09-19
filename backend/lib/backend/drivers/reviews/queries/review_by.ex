defmodule Backend.Reviews.Queries.ReviewBy do
  alias Backend.Reviews.Review
  import Ecto.Query

  def base_query() do
    from(r in Review,
      as: :review,
      join: s in assoc(r, :service),
      as: :service
    )
  end

  def by_service_id(query, id) do
    where(query, [review: r], r.service_id == ^id)
  end

  def by_user_id(query, id) do
    where(query, [review: r], r.user_id == ^id)
  end
end
