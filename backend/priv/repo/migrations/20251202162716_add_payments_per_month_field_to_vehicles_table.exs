defmodule Backend.Repo.Migrations.AddPaymentsPerMonthFieldToVehiclesTable do
  use Ecto.Migration

  def change do
    alter table(:vehicles) do
      add(:payments_per_month, :integer)
    end
  end
end
