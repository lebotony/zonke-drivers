defmodule Backend.Bookings.Queries.BookingBy do
  alias Backend.Bookings.Booking
  import Ecto.Query

  def base_query do
    from(b in Booking,
      as: :booking,
      join: s in assoc(b, :service),
      as: :service
    )
  end

  def by_id(query, id) do
    where(query, [booking: b], b.id == ^id)
  end

  def by_active_status(query, profile_id) do
    where(
      query,
      [booking: b, service: s],
      b.status == :active and s.business_profile_id == ^profile_id
    )
    |> order_by([booking: b], desc: b.inserted_at)
  end

  def by_pending_status(query, profile_id) do
    where(
      query,
      [booking: b, service: s],
      b.status == :pending and s.business_profile_id == ^profile_id
    )
    |> order_by([booking: b], desc: b.inserted_at)
  end

  def by_delivered_status(query, profile_id) do
    where(
      query,
      [booking: b, service: s],
      b.status == :delivered and s.business_profile_id == ^profile_id
    )
    |> order_by([booking: b], desc: b.inserted_at)
  end
end
