defmodule BackendWeb.Messenger.ParticipantJSON do
  def index(%{participants: participants}) do
    for(participant <- participants, do: show(%{participant: participant}))
  end

  def show(%{participant: participant}) do
    Map.take(participant, [
      :id,
      :first_name,
      :last_name,
      :username,
      :email,
      :location,
      :inserted_at,
      :updated_at
    ])
  end
end
