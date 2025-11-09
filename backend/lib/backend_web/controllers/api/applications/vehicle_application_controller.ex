defmodule BackendWeb.Applications.VehicleApplicationController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Applications.VehicleApplications

  def index(conn, params, session) do
    with {:ok, vehicle_applications, paginate} <-
           VehicleApplications.get_vehicle_applications(params) do
      render(conn, :index, %{vehicle_applications: vehicle_applications, paginate: paginate})
    end
  end

  # def index(conn, params, session) do
  #   with vehicle_applications <-
  #          VehicleApplications.get_vehicle_applications(params, session, :owner) do
  #     render(conn, :index, %{vehicle_applications: vehicle_applications})
  #   end
  # end

  def create(conn, params, session) do
    with {:ok, vehicle_application} <- VehicleApplications.create(params, session) do
      render(conn, :show, %{vehicle_application: vehicle_application})
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, vehicle_application} <- VehicleApplications.get_vehicle_application(id) do
      render(conn, :show, %{vehicle_application: vehicle_application})
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, vehicle_application} <- VehicleApplications.get_vehicle_application(id),
         {:ok, vehicle_application} <- VehicleApplications.update(vehicle_application, params) do
      render(conn, :show, %{vehicle_application: vehicle_application})
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, vehicle_application} <- VehicleApplications.get_vehicle_application(id),
         {:ok, _vehicle_application} <- VehicleApplications.delete(vehicle_application) do
      json(conn, :ok)
    end
  end
end
