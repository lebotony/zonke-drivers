defmodule Backend.Repo.Migrations.AddRatingFieldToDriversTable do
  use Ecto.Migration

  def change do
    alter table(:drivers) do
      add(:rating, :float)
    end
  end
end
