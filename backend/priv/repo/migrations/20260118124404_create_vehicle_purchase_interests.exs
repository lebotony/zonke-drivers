defmodule Backend.Repo.Migrations.CreateVehiclePurchaseInterests do
  use Ecto.Migration

  def change do
    create table(:vehicle_purchase_interests, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :vehicle_id, references(:vehicles, on_delete: :delete_all, type: :binary_id), null: false
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false
      add :seen, :boolean, default: false

      timestamps()
    end

    create index(:vehicle_purchase_interests, [:vehicle_id])
    create index(:vehicle_purchase_interests, [:user_id])
    create unique_index(:vehicle_purchase_interests, [:vehicle_id, :user_id])
  end
end
