defmodule Backend.Vehicles.Policy do
  @behaviour Bodyguard.Policy

  alias Backend.Vehicles.{Vehicle, VehicleDriver}
  alias Backend.Repo

  # Vehicle owner can manage their vehicle's drivers
  def authorize(action, %{user_id: user_id}, %VehicleDriver{} = vehicle_driver)
      when action in [:update, :delete, :show] do
    vehicle_driver = Repo.preload(vehicle_driver, :vehicle)

    if vehicle_driver.vehicle.user_id == user_id do
      :ok
    else
      :error
    end
  end

  # For create, check if user owns the vehicle
  def authorize(:create, %{user_id: user_id}, %{vehicle_id: vehicle_id}) do
    case Repo.get(Vehicle, vehicle_id) do
      %Vehicle{user_id: ^user_id} -> :ok
      _ -> :error
    end
  end

  def authorize(_, _, _), do: :error
end
