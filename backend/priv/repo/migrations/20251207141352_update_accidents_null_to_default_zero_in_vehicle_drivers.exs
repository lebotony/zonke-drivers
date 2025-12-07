defmodule Backend.Repo.Migrations.UpdateAccidentsNullToDefaultZeroInVehicleDrivers do
  use Ecto.Migration

  def change do
    execute "UPDATE vehicle_drivers SET accidents = 0 WHERE accidents IS NULL"

    alter table(:vehicle_drivers) do
      modify :accidents, :integer, default: 0, null: false
    end
  end
end
