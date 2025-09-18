defmodule Backend.BookingFactory do
  use ExMachina

  alias Backend.Bookings.Booking

  defmacro __using__(_opts) do
    quote do
      def booking_factory do
        %Booking{
          id: Ecto.UUID.generate(),
          status: "pending",
          booked_date: Date.utc_today(),
          booked_time: Time.utc_now(),
          user: build(:user),
          service: build(:service)
        }
      end
    end
  end
end
