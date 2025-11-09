defmodule Backend.Vehicles.VehicleDrivers do
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Vehicles.VehicleDriver
  alias Backend.Vehicles.Queries.VehicleDriverBy

  import Ecto.Query

  # defdelegate authorize(action, params, session), to: Policy

  def create(params) do
    Repo.transaction(fn ->
      {:ok, vehicle_driver} =
        %VehicleDriver{}
        |> VehicleDriver.changeset(Map.put(params, :active, true))
        |> Repo.insert()

      disable_vehicle_drivers(%{
        vehicle_id: vehicle_driver.vehicle_id,
        driver_id: vehicle_driver.driver_id
      })

      Repo.one(VehicleDriverBy.by_id_with_preloads(vehicle_driver.id))
    end)
  end

  def disable_vehicle_drivers(%{vehicle_id: vehicle_id, driver_id: driver_id}) do
    VehicleDriverBy.base_query()
    |> where([vd], vd.vehicle_id == ^vehicle_id and vd.driver_id != ^driver_id)
    |> update(set: [active: false])
    |> Repo.update_all([])
  end

  def update_vehicle_driver(%VehicleDriver{} = vehicle_driver, params) do
    vehicle_driver
    |> VehicleDriver.changeset(params)
    |> Repo.update()
  end

  def delete(%VehicleDriver{id: id} = vehicle_driver) do
    Repo.delete(vehicle_driver)
  end

  def get_vehicle_driver(id) do
    Repo.get_by(VehicleDriver, id: id)
    |> format_vehicle_driver()
  end

  defp format_vehicle_driver(%VehicleDriver{} = vehicle_driver), do: {:ok, vehicle_driver}
  defp format_vehicle_driver(nil), do: {:error, :not_found}
end
