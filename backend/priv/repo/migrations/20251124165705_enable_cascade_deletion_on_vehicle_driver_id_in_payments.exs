defmodule Backend.Repo.Migrations.EnableCascadeDeletionOnVehicleDriverIdInPayments do
  use Ecto.Migration

  def change do
    alter table(:payments) do
      modify :vehicle_driver_id,
        references(:vehicle_drivers, on_delete: :delete_all),
        from: references(:vehicle_drivers)
    end
  end
end
