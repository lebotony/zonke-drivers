defmodule Backend.Repo.Migrations.AddIndexToVehiclePurchaseInterests do
  use Ecto.Migration

  def change do
    # Composite index for filtering unseen purchase interests per vehicle
    # Used in vehicles.ex get_vehicles/2 for buyers_count
    create index(:vehicle_purchase_interests, [:vehicle_id, :seen])
  end
end
