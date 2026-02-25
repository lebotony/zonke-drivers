defmodule BackendWeb.PushTokenController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Accounts.PushTokens

  def create(conn, params, session) do
    user_id = session.id

    token_params = %{
      user_id: user_id,
      expo_push_token: Map.get(params, "expo_push_token"),
      device_id: Map.get(params, "device_id"),
      platform: Map.get(params, "platform")
    }

    case PushTokens.upsert(token_params) do
      {:ok, push_token} ->
        conn
        |> put_status(:created)
        |> json(%{success: true, token_id: push_token.id})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset.errors})
    end
  end

  def delete(conn, params, _session) do
    expo_push_token = Map.get(params, "expo_push_token")

    case PushTokens.delete_token(expo_push_token) do
      {:ok, _} ->
        json(conn, %{success: true})

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Token not found"})
    end
  end
end
