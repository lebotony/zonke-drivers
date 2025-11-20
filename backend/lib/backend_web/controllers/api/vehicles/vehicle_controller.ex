defmodule BackendWeb.Vehicles.VehicleController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Vehicles.Vehicles
  alias BackendWeb.Vehicles.VehicleDriverJSON
  alias BackendWeb.Assets.AssetJSON

  # TODO: add rate limiting
  def index_management_vehicle(conn, params, session) do
    with {:ok, vehicle_drivers, paginate} <-
           Vehicles.get_management_vehicles(params, session, :owner) do
      render(conn, VehicleDriverJSON, :index, %{
        vehicle_drivers: vehicle_drivers,
        paginate: paginate
      })
    end
  end

  def index_public(conn, params, _session) do
    with {:ok, vehicles, paginate} <- Vehicles.get_vehicles(params, :public) do
      render(conn, :index, %{vehicles: vehicles, paginate: paginate})
    end
  end

  def index(conn, params, session) do
    # with :ok <- Bodyguard.permit(Vehicles, :get_vehicles, %{id: profile_id}, session),
    with {:ok, vehicles, paginate} <- Vehicles.get_vehicles(params, session) do
      render(conn, :index, %{vehicles: vehicles, paginate: paginate})
    end
  end

  def create(conn, params, session) do
    # with :ok <- Bodyguard.permit(Vehicles, :create, %{id: profile_id}, session),
    with {:ok, vehicle} <- Vehicles.create(params, session) do
      render(conn, :show, vehicle: vehicle)
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

  def show_public(conn, %{id: id}, _session) do
    with {:ok, vehicle} <- Vehicles.get_vehicle(id, :public),
         :ok <- Bodyguard.permit(Vehicles, :show_public, vehicle, nil) do
      render(conn, :show, vehicle: vehicle)
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, vehicle} <- Vehicles.get_vehicle(id) do
        #  :ok <- Bodyguard.permit(Vehicles, :show, vehicle, session) do
      render(conn, :show, %{vehicle: vehicle})
    end
  end

  def update(conn, %{id: id} = params, session) do
    #  :ok <- Bodyguard.permit(Vehicles, :update, vehicle, session),
    with {:ok, vehicle} <- Vehicles.get_vehicle(id),
         {:ok, vehicle} <- Vehicles.update(vehicle, params) do
      render(conn, :show, %{vehicle: vehicle})
    end
  end

  def activate_vehicle(conn, params, _session) do
    #  :ok <- Bodyguard.permit(VehicleDrivers, :update, vehicle_driver, session),
    with {1, _nil} <- Vehicles.activate_vehicle(params) do
      json(conn, :ok)
    end
  end

  def update_asset(conn, params, session) do
    #  :ok <- Bodyguard.permit(Vehicles, :update, vehicle, session),
    with {:ok, asset} <- Vehicles.update_vehicle_asset(params) do
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

  def delete(conn, %{id: id}, session) do
    with {:ok, vehicle} <- Vehicles.get_vehicle(id),
         :ok <- Bodyguard.permit(Vehicles, :delete, vehicle, session),
         {:ok, _driver} <- Vehicles.delete(vehicle) do
      json(conn, :ok)
    end
  end
end
