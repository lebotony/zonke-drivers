defmodule BackendWeb.Applications.VehiclePurchaseInterestController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Applications.VehiclePurchaseInterests
  alias BackendWeb.Applications.VehiclePurchaseInterestJSON

  def index(conn, params, _session) do
    with {:ok, interests, paginate} <-
           VehiclePurchaseInterests.get_vehicle_purchase_interests(params) do
      render(conn, :index, %{interests: interests, paginate: paginate})
    end
  end

  def create(conn, params, session) do
    case VehiclePurchaseInterests.create(params, session) do
      {:ok, :interest_exists} ->
        json(conn, %{message: "Expressed already"})

      {:ok, _interest} ->
        json(conn, %{message: "Interest expressed successfully"})

      {:error, changeset} ->
        conn
        |> put_status(400)
        |> json(%{error: "Failed to express interest", details: changeset})
    end
  end

  def set_seen(conn, %{vehicle_id: vehicle_id}, _session) do
    with {:ok, count} <- VehiclePurchaseInterests.set_interests_seen(vehicle_id) do
      json(conn, %{count: count})
    end
  end
end
