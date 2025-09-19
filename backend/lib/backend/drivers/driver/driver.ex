defmodule Backend.Drivers.Driver do
  use Backend, :model

  alias Backend.Accounts.{BusinessProfile, User}
  alias Backend.Ecto.Embeds.{Duration, PriceRangeEmbed, PriceFixed}
  # alias Backend.Reviews.Review
  alias Backend.Vehicles.Vehicle
  alias Backend.Bookings.Booking

  @required_fields [:name, :location, :business_profile_id, :user_id]
  @optional_fields [
    :description,
    :location_options,
    :draft,
    :paused_at,
    :experience,
    :age,
  ]
  @embeds [:price_range, :price_fixed]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "drivers" do
    field(:description, :string)
    field(:location, :map)
    field(:location_options, {:array, :string})
    field(:draft, :boolean)
    field(:paused_at, :naive_datetime)
    field(:experience, :string)
    field(:age, :string)
    field(:searchable_document, Backend.Ecto.EctoTypes.Tsvector)

    embeds_one(:price_range, PriceRangeEmbed, on_replace: :delete)
    embeds_one(:price_fixed, PriceFixed)

    field(:rating, :float, virtual: true)
    field(:booking_count, :float, virtual: true)
    field(:rank_value, :decimal, virtual: true)

    belongs_to(:business_profile, BusinessProfile)

    # has_many(:reviews, Review)
    has_many(:bookings, Booking)
    many_to_many(:vehicles, Vehicle, join_through: VehicleDriver)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields -- @embeds)
    |> cast_embed(:price_range, required: false)
    |> cast_embed(:price_fixed, required: false)
    |> validate_required(@required_fields)
  end
end
