defmodule BackendWeb.UserController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Accounts.{Users, Registration}
  alias Backend.Guardian
  alias BackendWeb.Assets.AssetJSON

  def get_current_user(conn, _params, _session) do
    with ["" <> token] <- get_req_header(conn, "authorization"),
         clean_token when is_binary(clean_token) <- String.replace(token, "Bearer ", ""),
         {:ok, claims} <- Guardian.decode_and_verify(clean_token),
         {:ok, %{user_id: user_id}} <- Guardian.resource_from_claims(claims),
         {:ok, user} <- Users.get_user_by(id: user_id) do
      render(conn, :show, %{user: user})
    else
      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})

      {:error, reason} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Unauthorized", reason: inspect(reason)})

      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid request"})
    end
  end

  def create(conn, params, _session) do
    # Accounts send email confirmation email
    with {:ok, _user} <- Registration.register_user(params) do
      json(conn, :ok)
    else
      {:error, %Ecto.Changeset{errors: [username: {"username already taken", _}]} = changeset} ->
        conn
        |> put_status(:conflict)
        |> json(%{error: "Username already taken"})

      {:error, reason} ->
        conn
        |> put_status(:error)
        |> json(%{error: "Backend Error", reason: inspect(reason)})

      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid request"})
    end
  end

  def update(conn, params, %{user_id: user_id}) do
    with {:ok, user} <- Users.get_user_by(id: user_id),
         {:ok, user} <- Users.update(user, params) do
      render(conn, :show, user: user)
    end
  end

  def update_asset(conn, %{params: params}, %{user_id: user_id}) do
    with {:ok, asset} <- Users.update_user_asset(user_id, params) do
      render(conn, AssetJSON, :show, %{asset: asset})
    else
      {:error, :asset, "Failed to upload file: :econnrefused"} ->
        conn
        |> put_status(:conflict)
        |> json(%{error: "Failed to upload image"})

      {:error, reason} ->
        conn
        |> put_status(:error)
        |> json(%{error: "Backend Error", reason: inspect(reason)})

      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid request"})
    end
  end
end
