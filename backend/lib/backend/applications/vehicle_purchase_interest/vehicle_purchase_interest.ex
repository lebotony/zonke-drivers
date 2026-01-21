defmodule Backend.Applications.VehiclePurchaseInterest do
  use Backend, :model

  alias Backend.Vehicles.Vehicle
  alias Backend.Accounts.User

  import Ecto.Changeset

  @required_fields [:user_id, :vehicle_id]
  @optional_fields [:seen]

  @all_fields @required_fields ++ @optional_fields

  schema "vehicle_purchase_interests" do
    field(:seen, :boolean, default: false)

    belongs_to(:vehicle, Vehicle)
    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:vehicle)
    |> validate_required(@required_fields)
    |> unique_constraint([:vehicle_id, :user_id])
  end
end
