defmodule BackendWeb.Reviews.CommentController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Reviews.{Comments, Comment}

  def index(conn, params, session) do
    case Comments.get_driver_comments(params) do
      {:ok, comments, paginate} ->
        render(conn, :index, %{comments: comments, paginate: paginate})

      {:error, :driver_id_required} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "driver_id is required"})
    end
  end

  def create(conn, params, %{user_id: user_id}) do
    with {:ok, comment} <- Comments.create(params, user_id) do
      render(conn, :show, %{comment: comment})
    end
  end
end
