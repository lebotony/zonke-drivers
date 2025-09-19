defmodule Backend.Vehicles.Vehicle do
  use Backend, :model

  alias Backend.Accounts.BusinessProfile
  alias Backend.Vehicles.VehicleDriver
  alias Backend.Drivers.Driver
  alias Backend.Ecto.Embeds.{PriceRangeEmbed, PriceFixed}

  @required_fields [:name, :owner_id, :price_fixed]
  @optional_fields [:make, :model, :description, :mileage, :price_range, :active]
  @embeds [:price_range, :price_fixed]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "vehicles" do
    field(:name, :string)
    field(:make, :string)
    field(:model, :string)
    field(:description, :string)
    field(:mileage, :number)
    field(:active, :boolean, default: false)

    embeds_one(:price_range, PriceRangeEmbed, on_replace: :delete)
    embeds_one(:price_fixed, PriceFixed)

    belongs_to(:business_profile, BusinessProfile)

    many_to_many(:drivers, Driver, join_through: VehicleDriver)
    # has_many(:assets, Asset)

    timestamps()
  end

  def changeset(vehicle, attrs) do
    vehicle
    |> cast(attrs, @all_fields -- @embeds)
    |> cast_embed(:price_fixed, required: true)
    |> cast_embed(:price_range, required: false)
    |> assoc_constraint(:business_profile)
    |> validate_required(@required_fields)
  end
end
