defmodule Backend.ServiceFactory do
  use ExMachina

  alias Backend.Services.Service

  defmacro __using__(_opts) do
    quote do
      def service_factory do
        %Service{
          id: Ecto.UUID.generate(),
          name: sequence(:name, &"Test Service #{&1}"),
          user: build(:user),
          location: %{"lat" => 0.0, "lng" => 0.0},
          business_profile: build(:business_profile)
        }
      end
    end
  end
end
