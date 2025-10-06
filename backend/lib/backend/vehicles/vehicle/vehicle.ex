defmodule Backend.Vehicles.Vehicle do
  use Backend, :model

  alias Backend.Accounts.{User, BusinessProfile}
  alias Backend.Vehicles.VehicleDriver
  alias Backend.Drivers.Driver
  alias Backend.Ecto.Embeds.{PriceRangeEmbed, PriceFixed}
  alias Backend.Assets.Asset
  alias Backend.Bookings.VehicleBooking
  alias Backend.Ecto.EctoEnums.VehicleTypeEnum

  @required_fields [:name, :business_profile_id, :user_id, :type, :brand, :diesel, :manual]
  @optional_fields [:model, :description, :mileage, :active, :engine_capacity, :passengers]
  @embeds [:price_range, :price_fixed]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "vehicles" do
    field(:model, :string)
    field(:description, :string)
    field(:mileage, :integer)
    field(:active, :boolean, default: false)

    field(:type, VehicleTypeEnum)
    field(:brand, :string)
    field(:manual, :boolean)
    field(:diesel, :boolean)
    field(:engine_capacity, :float)
    field(:passengers, :integer)

    embeds_one(:price_range, PriceRangeEmbed, on_replace: :update)
    embeds_one(:price_fixed, PriceFixed, on_replace: :update)

    belongs_to(:business_profile, BusinessProfile)
    belongs_to(:user, User)

    many_to_many(:drivers, Driver, join_through: VehicleDriver)
    has_one(:asset, Asset)
    has_many(:vehicle_bookings, VehicleBooking)

    timestamps()
  end

  def changeset(vehicle, attrs) do
    vehicle
    |> cast(attrs, @all_fields -- @embeds)
    |> cast_embed(:price_fixed, required: true, with: &PriceFixed.changeset/2)
    |> cast_embed(:price_range, required: false, with: &PriceRangeEmbed.changeset/2)
    |> assoc_constraint(:business_profile)
    |> assoc_constraint(:user)
    |> validate_required(@required_fields)
  end
end
