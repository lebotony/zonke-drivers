defmodule Backend.Messenger.Schemas.Participant do
  use Backend, :model

  alias Backend.Messenger.Schemas.{ThreadParticipant, Thread, Message}

  schema "users" do
    field(:first_name, :string)
    field(:last_name, :string)
    field(:email, :string)
    field(:username, :string)
    field(:location, :map)

    many_to_many(:threads, Thread, join_through: ThreadParticipant)
    has_many(:messages, Message, foreign_key: :author_id)

    timestamps()
  end
end

# PARTICIPANT SCHEMA FOR TEST PURPOSES
defmodule Backend.TestExample.Participant do
  use Backend, :model

  alias Backend.Messenger.Schemas.{ThreadParticipant, Thread, Message}

  schema "participants" do
    field(:first_name, :string)
    field(:last_name, :string)
    field(:email, :string)
    field(:username, :string)
    field(:location, :map)

    many_to_many(:threads, Thread, join_through: ThreadParticipant)
    has_many(:messages, Message, foreign_key: :author_id)

    timestamps()
  end
end

# PARTICIPANT SCHEMA FOR TEST PURPOSES
