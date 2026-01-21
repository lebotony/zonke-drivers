defmodule BackendWeb.Vehicles.VehicleDriverController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Vehicles.VehicleDrivers

  def create(conn, params, session) do
    # with :ok <- Bodyguard.permit(VehicleDrivers, :create, params, session),
    with {:ok, vehicle_driver} <- VehicleDrivers.create(params) do
      render(conn, :show, %{vehicle_driver: vehicle_driver})
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, vehicle_driver} <- VehicleDrivers.get_vehicle_driver(id) do
      #  :ok <- Bodyguard.permit(VehicleDrivers, :show, vehicle_driver, session) do
      render(conn, :show, vehicle_driver: vehicle_driver)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, vehicle_driver} <- VehicleDrivers.get_vehicle_driver(id),
         #  :ok <- Bodyguard.permit(VehicleDrivers, :update, vehicle_driver, session),
         {:ok, vehicle_driver} <- VehicleDrivers.update_vehicle_driver(vehicle_driver, params) do
      render(conn, :show, vehicle_driver: vehicle_driver)
    end
  end

  def increment_accidents(conn, %{id: id} = _params, session) do
    with {:ok, vehicle_driver} <- VehicleDrivers.get_vehicle_driver(id),
         # IO.puts("22222222222222222"),
         #  :ok <- Bodyguard.permit(VehicleDrivers, :update, vehicle_driver, session),
         # IO.puts("33333333333333333"),
         {1, _nil} <- VehicleDrivers.increment_accidents_count(id) do
      json(conn, :ok)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, vehicle_driver} <- VehicleDrivers.get_vehicle_driver(id),
         #  :ok <- Bodyguard.permit(VehicleDrivers, :delete, vehicle_driver, session),
         {:ok, _vehicle_driver} <- VehicleDrivers.delete(vehicle_driver) do
      json(conn, :ok)
    end
  end
end
