defmodule Backend.Bookings.Bookings do
  alias Ecto.Multi
  alias Backend.Bookings.Booking
  alias Backend.Notifications.Notifications
  alias Backend.Bookings.Queries.BookingBy
  alias Backend.Repo

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    Multi.new()
    |> Multi.insert(
      :booking,
      Booking.changeset(%Booking{}, params)
    )
    |> Multi.run(:notification, fn _repo, %{booking: booking} ->
      Notifications.create(booking, user_id, %{booking: :created})
    end)
    |> Repo.transaction()
    |> case do
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
      {:ok, %{booking: booking}} -> {:ok, booking}
    end
  end

  def update(%Booking{} = booking, params) do
    Multi.new()
    |> Multi.update(
      :booking,
      Booking.changeset(booking, params)
    )
    |> Multi.run(:notification, fn _repo, %{booking: booking} ->
      Notifications.create(booking, booking.user_id, %{booking: :updated})
    end)
    |> Repo.transaction()
    |> case do
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
      {:ok, %{booking: booking}} -> {:ok, booking}
    end
  end

  def delete(%Booking{} = booking) do
    Multi.new()
    |> Multi.delete(:booking, booking)
    |> Multi.run(:notification, fn _repo, %{booking: booking} ->
      Notifications.create(booking, booking.user_id, %{booking: :deleted})
    end)
    |> Repo.transaction()
    |> case do
      {:error, reason, failed_value, _changes} -> {:error, {reason, failed_value}}
      {:ok, _booking} -> {:ok, _booking}
    end
  end

  def get_booking(id) do
    Repo.get_by(Booking, id: id)
    |> format_booking()
  end

  def get_all_bookings(profile_id) do
    BookingBy.base_query()
    |> BookingBy.by_active_status(profile_id)
    |> build_sort_all()
    |> Repo.all()
  end

  def get_pending_bookings(profile_id) do
    BookingBy.base_query()
    |> BookingBy.by_pending_status(profile_id)
    |> Repo.all()
  end

  def get_active_bookings(profile_id) do
    BookingBy.base_query()
    |> BookingBy.by_active_status(profile_id)
    |> Repo.all()
  end

  def get_delivered_bookings(profile_id) do
    BookingBy.base_query()
    |> BookingBy.by_delivered_status(profile_id)
    |> Repo.all()
  end

  def build_sort_all(query) do
    query
    |> order_by(
      [booking: b],
      [
        fragment(
          "CASE
          WHEN ? = ? THEN 1
          WHEN ? = ? THEN 2
          WHEN ? = ? THEN 3
        END",
          b.status,
          :pending,
          b.status,
          :active,
          b.status,
          :delivered
        ),
        desc: b.inserted_at
      ]
    )
  end

  defp format_booking(%Booking{} = booking), do: {:ok, booking}
  defp format_booking(nil), do: {:error, :not_found}
end
