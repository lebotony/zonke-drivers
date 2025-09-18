defmodule BackendWeb.UserJSON do
  def show(%{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email
    }
  end
end
