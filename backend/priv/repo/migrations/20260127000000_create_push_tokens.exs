defmodule Backend.Repo.Migrations.CreatePushTokens do
  use Ecto.Migration

  def change do
    create table(:push_tokens, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :expo_push_token, :string, null: false
      add :device_id, :string
      add :platform, :string
      add :active, :boolean, default: true

      timestamps()
    end

    create index(:push_tokens, [:user_id])
    create unique_index(:push_tokens, [:expo_push_token])
    create index(:push_tokens, [:user_id, :active])
  end
end
