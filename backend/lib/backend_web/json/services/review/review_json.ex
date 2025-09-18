defmodule BackendWeb.Services.Reviews.ReviewJSON do
  def index(%{reviews: reviews, pagination: pagination}) do
    %{
      pagination: %{
        after: pagination.after,
        total: pagination.total_count
      },
      data: for(review <- reviews, do: show(%{review: review}))
    }
  end

  def index(%{reviews: reviews}) do
    for(review <- reviews, do: show(%{review: review}))
  end

  def show(%{review: review}) do
    Map.take(review, [
      :id,
      :liked,
      :user_id,
      :service_id,
      :inserted_at,
      :updated_at
    ])
  end
end
