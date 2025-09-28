defmodule Backend.DriverFactory do
  use ExMachina

  alias Backend.Drivers.Driver

  defmacro __using__(_opts) do
    quote do
      def driver_factory do
        %Driver{
          id: Ecto.UUID.generate(),
          location: %{lat: "123", lon: "987"},
          business_profile: build(:business_profile),
          user: build(:user)
        }
      end
    end
  end
end
