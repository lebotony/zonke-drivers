defmodule Backend.Vehicles.Payment do
  use Backend, :model

  alias Backend.Vehicles.VehicleDriver
  alias Backend.Ecto.Embeds.PriceFixed


  @params [:vehicle_driver_id]
  @embeds [:price_fixed]

  schema "payment" do
    embeds_one(:price_fixed, PriceFixed)

    belongs_to(:vehicle_driver, VehicleDriver)

    timestamps()
  end

  def changeset(struct, attrs) do
    struct
    |> cast(attrs, @params -- @embeds)
    |> cast_embed(:price_fixed, required: true)
    |> assoc_constraint(:vehicle_driver)
    |> validate_required(@params)
  end
end
