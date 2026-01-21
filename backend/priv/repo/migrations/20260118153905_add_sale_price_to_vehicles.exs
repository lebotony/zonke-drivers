defmodule Backend.Repo.Migrations.AddSalePriceToVehicles do
  use Ecto.Migration

  def up do
    alter table(:vehicles) do
      remove :sale_price
    end

    alter table(:vehicles) do
      add :sale_price, :map, null: true
    end
  end

  def down do
    alter table(:vehicles) do
      remove :sale_price
    end

    alter table(:vehicles) do
      add :sale_price, :integer, null: true
    end
  end
end
