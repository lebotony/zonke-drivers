defmodule BackendWeb.SessionController do
  use BackendWeb, :controller
  alias Backend.Accounts.Session

  def create(conn, params) do
     IO.inspect(params, label: "Incoming params in SessionController")
    with {:ok, session} <- Session.authenticate(params) do
      render(conn, :show, session: session)
    end
  end
end
