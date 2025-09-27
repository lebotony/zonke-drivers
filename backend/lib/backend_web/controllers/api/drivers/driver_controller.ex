defmodule BackendWeb.Drivers.DriverController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Drivers.Drivers

  # TODO: add rate limiting

  def index_public(conn, params, _session) do
    with {:ok, drivers, paginate} <- Drivers.get_drivers(params, :public) do
      render(conn, :index, %{drivers: drivers, paginate: paginate})
    end
  end

  def index(conn, %{business_profile_id: profile_id} = params, session) do
    # with :ok <- Bodyguard.permit(Drivers, :get_drivers, %{id: profile_id}, session),
    with {:ok, drivers, paginate} <- Drivers.get_drivers(params) do
      render(conn, :index, %{drivers: drivers, paginate: paginate})
    end
  end

  def create(conn, %{business_profile_id: profile_id} = params, session) do
    with :ok <- Bodyguard.permit(Drivers, :create, %{id: profile_id}, session),
         {:ok, driver} <- Drivers.create(params, session) do
      render(conn, :show, driver: driver)
    end
  end

  def show_public(conn, %{id: id}, _session) do
    with {:ok, driver} <- Drivers.get_driver(id, :public),
         :ok <- Bodyguard.permit(Drivers, :show_public, driver, nil) do
      render(conn, :show, driver: driver)
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, driver} <- Drivers.get_driver(id),
         :ok <- Bodyguard.permit(Drivers, :show, driver, session) do
      render(conn, :show, driver: driver)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, driver} <- Drivers.get_driver(id),
         :ok <- Bodyguard.permit(Drivers, :update, driver, session),
         {:ok, driver} <- Drivers.update(driver, params) do
      render(conn, :show, driver: driver)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, driver} <- Drivers.get_driver(id),
         :ok <- Bodyguard.permit(Drivers, :delete, driver, session),
         {:ok, _driver} <- Drivers.delete(driver) do
      json(conn, :ok)
    end
  end
end
