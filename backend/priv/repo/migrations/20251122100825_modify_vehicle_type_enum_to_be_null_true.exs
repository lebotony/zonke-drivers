defmodule Backend.Repo.Migrations.ModifyVehicleTypeEnumToBeNullTrue do
  use Ecto.Migration

  def change do
    alter table(:vehicles) do
      modify(:type, :vehicle_type_enum, null: true)
    end
  end
end
