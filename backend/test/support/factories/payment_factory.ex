defmodule Backend.PaymentFactory do
  use ExMachina

  alias Backend.Vehicles.Payment

  defmacro __using__(_opts) do
    quote do
      def payment_factory do
        %Payment{
          id: Ecto.UUID.generate(),
          vehicle_driver: build(:vehicle_driver),
        }
      end
    end
  end
end
