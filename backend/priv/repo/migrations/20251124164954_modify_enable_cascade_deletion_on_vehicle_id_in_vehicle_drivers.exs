defmodule Backend.Repo.Migrations.ModifyEnableCascadeDeletionOnVehicleIdInVehicleDrivers do
  use Ecto.Migration

  def change do
    alter table(:vehicle_drivers) do
      modify :vehicle_id,
        references(:vehicles, on_delete: :delete_all),
        from: references(:vehicles)
    end
  end
end
