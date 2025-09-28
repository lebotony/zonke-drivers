defmodule BackendWeb.SessionController do
  use BackendWeb, :controller
  alias Backend.Accounts.Session

  def create(conn, params) do
    with {:ok, session} <- Session.authenticate(params) do
      render(conn, :show, session: session)
    end
  end
end
