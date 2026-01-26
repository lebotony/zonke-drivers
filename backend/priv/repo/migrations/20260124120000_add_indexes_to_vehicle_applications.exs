defmodule Backend.Repo.Migrations.AddIndexesToVehicleApplications do
  use Ecto.Migration

  def change do
    # Composite index for filtering unseen applications per vehicle
    # Used in vehicles.ex:161-166 for unseen application counts
    create index(:vehicle_applications, [:vehicle_id, :seen])

    # Index for checking if driver already applied to a vehicle
    # Used in vehicle_applications.ex:14-15 for existence checks
    create index(:vehicle_applications, [:driver_id])
  end
end