defmodule Backend.Applications.VehicleApplication do
  use Backend, :model

  alias Backend.Vehicles.Vehicle
  alias Backend.Accounts.User
  alias Backend.Ecto.EctoEnums.ApplicationStatusEnum
  alias Backend.Ecto.Embeds.{PriceFixed}

  import Ecto.Changeset

  @required_fields [:user_id, :vehicle_id]
  @optional_fields [:status]

  @all_fields @required_fields ++ @optional_fields

  schema "vehicle_applications" do
    field(:status, ApplicationStatusEnum, default: :pending)

    belongs_to(:vehicle, Vehicle)
    belongs_to(:driver, Driver)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> assoc_constraint(:driver)
    |> assoc_constraint(:vehicle)
    |> validate_required(@required_fields)
  end
end
