defmodule Backend.Reviews.Reviews do
  alias Backend.Repo
  alias Backend.Reviews.Review
  alias Backend.Services.Service
  alias Backend.Reviews.Queries.ReviewBy
  alias BackendWeb.ReviewChannel
  alias Backend.Notifications.Notifications

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    review =
      %Review{}
      |> Review.changeset(params)
      |> Repo.insert()

    case review do
      {:ok, review} ->
        ReviewChannel.push_out!("created", review)
        Notifications.create(review, user_id, :review)
        {:ok, review}

      {:error, error} ->
        {:error, error}
    end
  end

  def get_review(id) do
    Repo.get_by(Review, id: id)
    |> format_review()
  end

  def delete(%Review{id: id} = review) do
    Repo.delete(review)
  end

  def get_service_reviews(service_id) do
    ReviewsBy.base_query()
    |> ReviewsBy.by_service_id(service_id)
    |> Repo.all()
  end

  def get_my_reviews(user_id) do
    ReviewsBy.base_query()
    |> ReviewsBy.by_user_id(user_id)
    |> Repo.all()
  end

  def like_or_unlike_review(review, %{user_id: user_id}) do
    users_liked = review.users_liked || []

    case user_id in users_liked do
      true ->
        unlike_comment(review, user_id)

      _ ->
        like_comment(review, user_id)
    end
  end

  def like_comment(%Review{likes: likes, users_liked: users_liked} = review, user_id) do
    params = %{
      users_liked: users_liked ++ [user_id],
      likes: likes + 1
    }

    updated_review =
      review
      |> Review.changeset(params)
      |> Repo.update()

    case updated_review do
      {:ok, review} ->
        ReviewChannel.push_out!("liked", review)
        {:ok, review}

      {:error, error} ->
        {:error, error}
    end
  end

  def unlike_comment(%Review{likes: likes, users_liked: users_liked} = review, user_id) do
    params = %{
      users_liked: Enum.reject(users_liked, fn id -> user_id == id end),
      likes: likes - 1
    }

    updated_review =
      review
      |> Review.changeset(params)
      |> Repo.update()

    case updated_review do
      {:ok, review} ->
        ReviewChannel.push_out!("unliked", review)
        {:ok, review}

      {:error, error} ->
        {:error, error}
    end
  end

  def format_review(%Review{} = review), do: {:ok, review}
  def format_review(nil), do: {:error, :not_found}
end
