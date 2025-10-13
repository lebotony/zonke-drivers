defmodule Backend.Reviews.Review do
  use Backend, :model

  alias Backend.Drivers.Driver
  alias Backend.Vehicles.Vehicle
  alias Backend.Accounts.User

  @required_fields [:comment, :rating, :author_id]
  @optional_fields [:likes, :users_liked, :driver_id, :vehicle_id]
  @all_fields @required_fields ++ @optional_fields

  schema "reviews" do
    field(:comment, :string)
    field(:likes, :integer, default: 0)
    field(:users_liked, {:array, :string}, default: [])
    field(:rating, :float)

    belongs_to(:driver, Driver)
    belongs_to(:vehicle, Vehicle)
    belongs_to(:author, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
    |> validate_vehicle_or_driver()
  end

  defp validate_vehicle_or_driver(changeset) do
    vehicle_id = get_field(changeset, :vehicle_id)
    driver_id = get_field(changeset, :driver_id)

    if is_nil(vehicle_id) and is_nil(driver_id) do
      add_error(
        changeset,
        :base,
        "Either vehicle_id or driver_id must be present"
      )
    else
      changeset
    end
  end
end
