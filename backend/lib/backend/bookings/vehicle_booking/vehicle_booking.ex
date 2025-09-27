defmodule Backend.Bookings.VehicleBooking do
  use Backend, :model

  alias Backend.Vehicles.Vehicle
  alias Backend.Accounts.User
  alias Backend.Ecto.EctoEnums.BookingStatusEnum
  alias Backend.Ecto.Embeds.{Duration, PriceFixed}

  import Ecto.Changeset

  @required_fields [:user_id, :vehicle_id]
  @optional_fields [:note, :status, :booked_date]
  @embeds [:duration, :price_fixed]

  @all_fields @required_fields ++ @optional_fields ++ @embeds

  schema "vehicle_bookings" do
    field(:booked_date, :date)
    field(:note, :string)
    field(:status, BookingStatusEnum, default: :pending)

    embeds_one(:duration, Duration, on_replace: :update)
    embeds_one(:price_fixed, PriceFixed, on_replace: :update)

    belongs_to(:vehicle, Vehicle)
    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields -- @embeds)
    |> cast_embed(:duration, required: false, with: &Duration.changeset/2)
    |> cast_embed(:price_fixed, required: false, with: &PriceFixed.changeset/2)
    |> assoc_constraint(:user)
    |> assoc_constraint(:vehicle)
    |> validate_required(@required_fields)
  end
end
