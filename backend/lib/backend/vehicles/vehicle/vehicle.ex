defmodule Backend.Vehicles.Vehicle do
  use Backend, :model

  alias Backend.Accounts.{User, BusinessProfile}
  alias Backend.Vehicles.VehicleDriver
  alias Backend.Drivers.Driver
  alias Backend.Ecto.Embeds.PriceFixed
  alias Backend.Assets.Asset
  alias Backend.Bookings.VehicleBooking
  alias Backend.Reviews.Review
  alias Backend.Ecto.EctoEnums.{VehicleTypeEnum, FuelTypeEnum}

  @required_fields [:business_profile_id, :type, :brand, :fuel_type, :manual]
  @optional_fields [:model, :description, :mileage, :active, :engine_capacity, :passengers, :model_year, :user_id]
  @embeds [:price_fixed]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "vehicles" do
    field(:model, :string)
    field(:description, :string)
    field(:mileage, :integer)
    field(:active, :boolean, default: false)
    field(:type, VehicleTypeEnum)
    field(:brand, :string)
    field(:manual, :boolean)
    field(:fuel_type, FuelTypeEnum)
    field(:engine_capacity, :float)
    field(:passengers, :integer)
    field(:model_year, :integer)
    field(:searchable_document, Backend.Ecto.EctoTypes.Tsvector)

    embeds_one(:price_fixed, PriceFixed, on_replace: :update)

    field(:rating, :float, virtual: true)
    field(:rank_value, :decimal, virtual: true)

    belongs_to(:business_profile, BusinessProfile)
    belongs_to(:user, User)

    has_one(:asset, Asset)
    has_many(:vehicle_bookings, VehicleBooking)
    has_many(:reviews, Review)

    many_to_many(:drivers, Driver, join_through: VehicleDriver)

    timestamps()
  end

  def changeset(vehicle, attrs) do
    vehicle
    |> cast(attrs, @all_fields -- @embeds)
    |> cast_embed(:price_fixed, required: true, with: &PriceFixed.changeset/2)
    |> assoc_constraint(:business_profile)
    |> validate_required(@required_fields)
  end
end
