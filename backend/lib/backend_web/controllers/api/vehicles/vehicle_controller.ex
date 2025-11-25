defmodule BackendWeb.Vehicles.VehicleController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Vehicles.Vehicles
  alias BackendWeb.Vehicles.VehicleDriverJSON
  alias BackendWeb.Assets.AssetJSON
  alias BackendWeb.Vehicles.VehicleJSON
  alias Backend.Repo

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
    #  :ok <- Bodyguard.permit(Vehicles, :update, vehicle_driver, session),
    case Vehicles.activate_vehicle(params) do
      {:ok, _vehicle} ->
        json(conn, :ok)

      {:error, :missing_fields} ->
        conn
        |> put_status(400)
        |> json(%{error: "missing_fields"})
    end
  end

  def update_asset(conn, params, session) do
    vehicle_id = Map.get(params, :vehicle_id, nil)
    #  :ok <- Bodyguard.permit(Vehicles, :update, vehicle, session),
    with {:ok, asset} <- Vehicles.update_vehicle_asset(params, session) do
      if is_binary(vehicle_id) do
        render(conn, AssetJSON, :show, %{asset: asset})
      else
        case Vehicles.get_vehicle(asset.vehicle_id) do
          {:ok, vehicle} ->
            render(conn, VehicleJSON, :show, %{vehicle: Repo.preload(vehicle, :asset)})

          {:error, reason} ->
            {:error, reason}
        end
      end
    else
      {:error, :asset, "Failed to upload file: :econnrefused"} ->
        conn
        |> put_status(:conflict)
        |> json(%{error: "Failed to upload image"})
    end
  end

  def delete(conn, %{id: id}, _session) do
    # :ok <- Bodyguard.permit(Vehicles, :delete, vehicle, session),
    with {:ok, vehicle} <- Vehicles.get_vehicle(id),
         {:ok, _} <- Vehicles.delete(vehicle) do
      json(conn, :ok)
    end
  end
end
