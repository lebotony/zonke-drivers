defmodule BackendWeb.UserJSON do
  alias BackendWeb.Assets.AssetJSON
  alias Backend.Assets.Assets

  def show(%{user: user}) do
    asset = if Map.has_key?(user, :asset) and user.asset, do: AssetJSON.show(%{asset: user.asset}), else: nil

    %{
      id: Map.get(user, :id),
      first_name: Map.get(user, :first_name),
      last_name: Map.get(user, :last_name),
      username: Map.get(user, :username),
      email: Map.get(user, :email),
      role: Map.get(user, :role),
      location: Map.get(user, :location),
      asset_url: Map.get(user, :asset_filename) |> prepare_url(),
      asset: asset
    }
    |> Enum.reject(fn {_k, v} -> is_nil(v) end)
    |> Enum.into(%{})
  end

  defp prepare_url(filename) do
    case Assets.presigned_url(filename) do
      {:ok, url} -> url
      _ -> nil
    end
  end
end
