defmodule Backend.Repo.Migrations.AddOnboardingCompleteToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:onboarding_complete, :boolean, default: false, null: false)
    end
  end
end
