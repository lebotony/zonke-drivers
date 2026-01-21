defmodule Backend.Repo.Migrations.AddOnSaleToVehicles do
  use Ecto.Migration

  def change do
    alter table(:vehicles) do
      add :on_sale, :boolean, default: false, null: false
      add :sale_price, :integer, null: true
    end

    create index(:vehicles, [:on_sale], where: "on_sale = true")
  end
end
