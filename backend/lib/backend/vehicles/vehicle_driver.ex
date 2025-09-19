defmodule Backend.Vehicles.VehicleDriver do
  use Backend, :model

  alias Backend.Vehicles.Vehicle
  alias Backend.Drivers.Driver

  @params [:driver_id, :vehicle_id]

  schema "vehicle_drivers" do
    belongs_to(:driver, Driver)
    belongs_to(:vehicle, Vehicle)

    timestamps()
  end

  def changeset(struct, attrs) do
    struct
    |> cast(attrs, @params)
    |> assoc_constraint(:driver)
    |> assoc_constraint(:vehicle)
    |> validate_required(@params)
  end
end
