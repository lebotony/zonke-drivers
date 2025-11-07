defmodule Backend.Reviews.Queries.CommentsBy do
  alias Backend.Reviews.Comment
  import Ecto.Query

  def base_query() do
    from(c in Comment,
      as: :comment
    )
  end

  def by_driver(query, id) do
    where(query, [comment: c], c.driver_id == ^id)
  end

  def by_user(query, id) do
    where(query, [comment: c], c.user_id == ^id)
  end
end
