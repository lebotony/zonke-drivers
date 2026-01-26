defmodule Backend.Repo.Migrations.AddMessagingIndexes do
  use Ecto.Migration

  def change do
    # Composite index for unseen message counts per thread
    # Used in threads.ex:68-73 for unread badge counts
    # Covering index includes all WHERE clause columns for optimal performance
    create index(:messages, [:thread_id, :seen, :author_id])

    # Index for finding all threads for a participant (inbox listing)
    # Used in thread_by.ex:17-21
    # The existing unique index [thread_id, participant_id] cannot efficiently
    # filter by participant_id alone due to left-to-right index scanning
    create index(:thread_participants, [:participant_id])
  end
end
