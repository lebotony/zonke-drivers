defmodule Backend.Repo.Migrations.UpdateDriverTsvectorToUsePlaceField do
  use Ecto.Migration

  def up do
    execute "ALTER TABLE drivers DROP COLUMN IF EXISTS searchable_document;"

    execute """
    ALTER TABLE drivers
    ADD COLUMN searchable_document tsvector
    GENERATED ALWAYS AS (
      to_tsvector(
        'english',
        coalesce(description, '') || ' ' || coalesce(location->>'place', '')
      )
    ) STORED;
    """

    execute """
    CREATE INDEX drivers_searchable_idx ON drivers USING gin(searchable_document);
    """
  end

  def down do
    execute "DROP INDEX IF EXISTS drivers_searchable_idx;"

    execute """
    ALTER TABLE drivers DROP COLUMN IF EXISTS searchable_document;
    """

    execute """
    ALTER TABLE drivers
    ADD COLUMN searchable_document tsvector
    GENERATED ALWAYS AS (
      to_tsvector(
        'english',
        coalesce(description, '') || ' ' || coalesce(location->>'address', '')
      )
    ) STORED;
    """

    execute """
    CREATE INDEX drivers_searchable_idx ON drivers USING gin(searchable_document);
    """
  end
end
