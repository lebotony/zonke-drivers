defmodule BackendWeb.UserJSON do
  alias BackendWeb.Assets.AssetJSON

  def show(%{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      role: user.role,
      location: user.location,
      asset: AssetJSON.show(%{asset: user.asset})
    }
  end
end
