defmodule Backend.Services.Service do
  use Backend, :model

  alias Backend.Accounts.{BusinessProfile, User}
  alias Backend.Ecto.Embeds.{Duration, PriceRangeEmbed, PriceFixed}
  alias Backend.Reviews.Review
  alias Backend.Bookings.Booking

  @required_fields [:name, :location, :business_profile_id, :user_id]
  @optional_fields [
    :description,
    :rate,
    :location_options,
    :draft,
    :paused_at
  ]
  @embeds [:price_range, :price_fixed, :duration]
  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "services" do
    field(:name, :string)
    field(:description, :string)
    field(:location, :map)
    field(:location_options, {:array, :string})
    field(:draft, :boolean)
    field(:paused_at, :naive_datetime)
    field(:rate, :string)
    field(:searchable_document, Backend.Ecto.EctoTypes.Tsvector)

    embeds_one(:duration, Duration, on_replace: :delete)
    embeds_one(:price_range, PriceRangeEmbed, on_replace: :delete)
    embeds_one(:price_fixed, PriceFixed)

    field(:rating, :float, virtual: true)
    field(:booking_count, :float, virtual: true)
    field(:rank_value, :decimal, virtual: true)

    belongs_to(:business_profile, BusinessProfile)
    belongs_to(:user, User)

    has_many(:reviews, Review)
    has_many(:bookings, Booking)
    # has many qa
    # has a chat about the service...create  a topic and people can chat about that topic

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields -- @embeds)
    |> cast_embed(:price_range, required: false)
    |> cast_embed(:price_fixed, required: false)
    |> cast_embed(:duration, required: false)
    |> validate_required(@required_fields)
    |> validate_length(:name, min: 3, max: 100)
    |> unique_constraint(:name, name: :services_name_business_profile_id_index)
  end
end
