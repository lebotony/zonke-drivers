defmodule Backend.Repo.Migrations.UpgradeObanSchema do
  use Ecto.Migration

  def up do
    Oban.Migrations.up()
  end

  def down do
    :ok
  end
end
