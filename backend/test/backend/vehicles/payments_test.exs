defmodule Backend.Vehicles.PaymentsTest do
  use Backend.DataCase, async: true
  use Backend.MoxCase

  import Backend.Factory

  setup do
    user = insert(:user)


    params = %{
      service_id: service.id,
      status: "pending",
      booked_date: Date.utc_today(),
      booked_time: Time.utc_now()
    }

    %{user: user, params: params}
  end

  describe "create/2" do
    test "successfully creates a payment", %{user: user, params: params} do
      BroadcastMock
      |> Mox.expect(:broadcast_from!, fn _pid, topic, event, payload ->
        assert payload.type == :booking
      end)

      assert {:ok, %Booking{} = booking} = Bookings.create(params, %{user_id: user.id})
      assert booking.user_id == user.id
      assert booking.status == :pending
    end

    test "returns error for invalid params", %{user: user} do
      params = %{service_id: nil, status: nil}

      assert {:error, {_reason, %Ecto.Changeset{}}} = Bookings.create(params, %{user_id: user.id})
    end
  end

  describe "update/2" do
    test "successfully updates a booking", %{user: user, params: params} do
      BroadcastMock
      |> Mox.expect(:broadcast_from!, 2, fn _pid, topic, event, payload ->
        assert payload.type == :booking
      end)

      {:ok, booking} = Bookings.create(params, %{user_id: user.id})

      assert {:ok, %Booking{} = updated} = Bookings.update(booking, %{status: :active})
      assert updated.status == :active
    end
  end

  describe "delete/1" do
    test "successfully deletes a booking", %{user: user, params: params} do
      BroadcastMock
      |> Mox.expect(:broadcast_from!, 2, fn _pid, topic, event, payload ->
        assert payload.type == :booking
      end)

      {:ok, booking} = Bookings.create(params, %{user_id: user.id})

      assert {:ok, _} = Bookings.delete(booking)
      assert {:error, :not_found} = Bookings.get_booking(booking.id)
    end
  end

  describe "get_booking/1" do
    test "returns booking if found", %{user: user, params: params} do
      BroadcastMock
      |> Mox.expect(:broadcast_from!, fn _pid, topic, event, payload ->
        assert payload.type == :booking
      end)

      {:ok, booking} = Bookings.create(params, %{user_id: user.id})

      {:ok, %Booking{} = booking} = Bookings.get_booking(booking.id)
      assert booking.user_id == user.id
    end

    test "returns error if not found", %{user: user, params: params} do
      assert {:error, :not_found} = Bookings.get_booking(uuid())
    end
  end
end
