defmodule BackendWeb.Messenger.ThreadJSON do
  alias BackendWeb.Messenger.{MessageJSON, ThreadParticipantJSON}

  def index(%{threads: threads, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(thread <- threads, do: show(%{thread: thread}))
    }
  end

  def show(%{thread: thread}) do
    messages =
      if Ecto.assoc_loaded?(thread.messages) do
        MessageJSON.index(%{messages: thread.messages})
      else
        %{}
      end

    %{
      id: thread.id,
      messages: messages,
      thread_participants:
        ThreadParticipantJSON.index(%{thread_participants: thread.thread_participants}),
      last_message: MessageJSON.show(%{message: thread.last_message}),
      unseen_msg_count: thread.unseen_msg_count
    }
  end
end
