defmodule Backend.Messenger.Messages do
  import Ecto.Query

  alias Ecto.Multi
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Messenger.Threads
  alias Backend.Messenger.Schemas.Message
  alias Backend.Messenger.Queries.MessageBy
  alias Backend.Accounts.User
  alias Backend.Notifications.PushNotification

  require Logger

  def create(params, user_id) do
    new_params = Map.put(params, :author_id, user_id)

    Multi.new()
    |> Multi.insert(:message, Message.changeset(%Message{}, new_params))
    |> Multi.run(:push_notification, fn _repo, %{message: message} ->
      with {:ok, thread} <- Threads.get_thread(message.thread_id, :plain),
           other_participant <- find_other_participant(thread, user_id),
           author when not is_nil(author) <- Repo.get(User, user_id) do
        PushNotification.enqueue_push(%{
          recipient_id: other_participant.id,
          notifier_id: user_id,
          title: "New message from #{author.first_name} #{author.last_name}",
          body: String.slice(message.content, 0..100),
          data: %{
            type: "message",
            thread_id: message.thread_id,
            deep_link: "zonkedrivers://chats/#{message.thread_id}"
          }
        })

        {:ok, message}
      else
        _ -> {:ok, message}
      end
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{message: message}} -> {:ok, message}
      {:error, :message, changeset, _} -> {:error, changeset}
      {:error, _step, reason, _} -> {:error, reason}
    end
  end

  defp find_other_participant(thread, current_user_id) do
    thread = Repo.preload(thread, thread_participants: :participant)

    Enum.find(thread.thread_participants, fn tp ->
      tp.participant.id != current_user_id
    end)
    |> case do
      nil -> nil
      tp -> tp.participant
    end
  end

  def get_message(id) do
    Repo.get_by(Message, id: id)
    |> format_message()
  end

  def get_thread_messages(params) do
    data =
      MessageBy.base_query()
      |> where([m], m.thread_id == ^params.thread_id)
      |> order_by([m], desc: m.inserted_at)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def update(%Message{} = message, params) do
    updated_message =
      message
      |> Message.changeset(params)
      |> Repo.update()

    case updated_message do
      {:ok, message} ->
        MessengerChannel.push_out!(message)
        format_message(message)

      {:error, error} ->
        {:error, error}
    end
  end

  def delete(message) do
    Repo.delete(message)
  end

  def unseen_messages_count(thread_id, participant_id) do
    Repo.one(
      from(m in Message,
        where: m.thread_id == ^thread_id,
        where: m.author_id != ^participant_id,
        where: m.seen == false,
        select: count(m.id)
      )
    )
  end

  def format_message(%Message{} = message), do: {:ok, message}
  def format_message(nil), do: {:error, :not_found}
end
