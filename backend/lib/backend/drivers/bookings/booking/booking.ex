defmodule Backend.Bookings.Booking do
  use Backend, :model

  alias Backend.Vehicles.Vehicle
  alias Backend.Accounts.User
  alias Backend.Ecto.EctoEnums.BookingStatusEnum

  import Ecto.Changeset

  @required_fields [:booked_date, :user_id, :status]
  @params [:note]
  @all_fields @required_fields ++ @params

  schema "bookings" do
    # field(:booked_time, :time)
    field(:booked_date, :date)
    field(:note, :string)
    field(:status, BookingStatusEnum)

    belongs_to(:service, Service)
    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
  end
end
