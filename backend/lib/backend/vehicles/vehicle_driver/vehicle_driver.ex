defmodule Backend.Vehicles.VehicleDriver do
  use Backend, :model

  alias Backend.Vehicles.{Vehicle, Payment}
  alias Backend.Drivers.Driver

  @required_params [:driver_id, :vehicle_id]
  @optional_params [:active]
  @all_params @optional_params ++ @required_params

  schema "vehicle_drivers" do
    field(:accidents, :integer,  default: 0)
    field(:active, :boolean, default: false)

    field(:total_payments, :decimal, virtual: true)
    field(:last_payment, :decimal, virtual: true)
    field(:payment_count, :integer, virtual: true)

    belongs_to(:driver, Driver)
    belongs_to(:vehicle, Vehicle)

    has_many(:payments, Payment)

    timestamps()
  end

  def changeset(struct, attrs) do
    struct
    |> cast(attrs, @all_params)
    |> assoc_constraint(:driver)
    |> assoc_constraint(:vehicle)
    |> validate_required(@required_params)
    |> unique_constraint([:driver_id, :vehicle_id],
      name: :vehicle_drivers_driver_id_vehicle_id_unique_index,
      message: "driver is already assigned to this vehicle"
    )
  end
end
