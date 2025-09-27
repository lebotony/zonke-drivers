defmodule Backend.Bookings.Queries.VehicleBookingBy do
  alias Backend.Bookings.VehicleBooking
  import Ecto.Query

  def base_query do
    from(vb in VehicleBooking,
      as: :vehicle_booking,
    )
  end

  def by_id(query, id) do
    where(query, [vehicle_booking: vb], vb.id == ^id)
  end

  def by_driver(query, id) do
    query
    |> where([vehicle_booking: vb], vb.user_id == ^id)
  end

  def by_vehicle_owner(query, id) do
    query
    |> join(:inner, [vehicle_booking: vb], v in assoc(vb, :vehicle), as: :vehicle)
    |> where([vehicle: v], v.user_id == ^id)
  end

  # def by_accepted_status(query, user_id) do
  #   query
  #   |> where([vehicle_booking: vb],vb.status == :accepted)
  #   |> order_by([vehicle_booking: vb], desc: vb.inserted_at)
  # end

  # def by_pending_status(query, profile_id) do
  #   query
  #   |> where([vehicle_booking: vb],vb.status == :pending)
  #   |> order_by([vehicle_booking: vb], desc: vb.inserted_at)
  # end

  # def by_rejected_status(query, profile_id) do
  #   query
  #   |> where([vehicle_booking: vb],vb.status == :rejected)
  #   |> order_by([vehicle_booking: vb], desc: vb.inserted_at)
  # end
end
