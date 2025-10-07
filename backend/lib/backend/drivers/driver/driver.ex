defmodule Backend.Drivers.Driver do
  use Backend, :model

  alias Backend.Accounts.{BusinessProfile, User}
  alias Backend.Ecto.Embeds.{PriceRangeEmbed, PriceFixed, Licence}
  # alias Backend.Reviews.Review
  alias Backend.Vehicles.Vehicle
  alias Backend.Bookings.DriverBooking

  @required_fields [:location, :business_profile_id, :user_id]
  @optional_fields [
    :description,
    :location_options,
    :active,
    :paused_at,
    :experience,
    :age,
    :licences,
    :platforms
  ]
  @embeds [:price_range, :price_fixed]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "drivers" do
    field(:description, :string)
    field(:location, :string)
    field(:location_options, {:array, :string})
    field(:active, :boolean, default: false)
    field(:paused_at, :naive_datetime)
    field(:experience, :integer)
    field(:age, :integer)
    field(:platforms, {:array, :string})
    field(:searchable_document, Backend.Ecto.EctoTypes.Tsvector)

    embeds_one(:price_range, PriceRangeEmbed, on_replace: :update)
    embeds_one(:price_fixed, PriceFixed, on_replace: :update)
    embeds_many(:licences, Licence, on_replace: :delete)

    field(:rating, :float, virtual: true)
    field(:booking_count, :float, virtual: true)
    field(:rank_value, :decimal, virtual: true)
    field(:email, :string, virtual: true)
    field(:first_name, :string, virtual: true)
    field(:last_name, :string, virtual: true)
    field(:username, :string, virtual: true)
    field(:previous_vehicles, :integer, virtual: true)
    field(:total_accidents, :integer, virtual: true)

    belongs_to(:business_profile, BusinessProfile)
    belongs_to(:user, User)

    # has_many(:reviews, Review)
    has_many(:driver_bookings, DriverBooking)
    many_to_many(:vehicles, Vehicle, join_through: VehicleDriver)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields -- @embeds)
    |> cast_embed(:price_range, required: false, with: &PriceRangeEmbed.changeset/2)
    |> cast_embed(:price_fixed, required: false, with: &PriceFixed.changeset/2)
    |> cast_embed(:licences, required: false, with: &Licence.changeset/2)
    |> assoc_constraint(:user)
    |> assoc_constraint(:business_profile)
    |> validate_required(@required_fields)
  end
end
