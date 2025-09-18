defmodule Backend.Messenger.Threads do
  alias Ecto.Multi
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Messenger.Schemas.{ThreadParticipant, Thread, Participant, Message}
  alias Backend.Messenger.Messages
  alias Backend.Messenger.Queries.ThreadBy

  import Ecto.Query

  @preloads [:messages, [thread_participants: :participant]]

  def get_thread(id) do
    Repo.get(Thread, id)
    |> Repo.preload(@preloads)
    |> format_thread()
  end

  def get_participant_thread_ids(participant_id) do
    ThreadBy.base_query()
    |> ThreadBy.by_participant(participant_id)
    |> select([thread: t], t.id)
    |> Repo.all()
  end

  def get_participant_threads(params, %{user_id: participant_id}) do
    unseen_messages_count_subquery =
      from(m in Message,
        where:
          m.seen == false and
          m.author_id != ^participant_id and
          m.thread_id == parent_as(:thread).id,
        select: %{count: count(m.id)}
      )

    last_message_subquery =
      from(m in Message,
        where: m.thread_id == parent_as(:thread).id,
        order_by: [desc: m.inserted_at],
        limit: 1
      )

    data =
      ThreadBy.base_query()
      |> ThreadBy.by_participant(participant_id)
      # |> distinct([t], t.id)
      |> join(:left_lateral, [t], umc in subquery(unseen_messages_count_subquery), on: true)
      |> join(:left_lateral, [t], lm in subquery(last_message_subquery), as: :lm, on: true)
      |> select_merge([t, _tp, umc, lm], %{
          t |
          last_message: lm,
          unseen_msg_count: coalesce(umc.count, 0),
        })
      |> order_by([t, _tp, _umc, lm], desc: lm.inserted_at)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    threads = Repo.preload(data.entries, [thread_participants: :participant])

    {:ok, threads, PaginateHelper.prep_paginate(data)}
  end

  def initialize_thread(participant_id_1, participant_id_2) do
    participant_ids = [participant_id_1, participant_id_2]

    Multi.new()
    |> Multi.insert(
      :thread,
      Thread.changeset(%Thread{}, %{})
    )
    |> Multi.run(:thread_participants, fn _, %{thread: thread} ->
      with [ok: tp_1, ok: tp_2] <- ThreadParticipant.create(thread, participant_ids) do
        {:ok, [tp_1, tp_2]}
      end
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{thread: thread}} ->
        preloaded_thread = Repo.preload(thread, @preloads)
        {:ok, preloaded_thread}

      {:error, reason, failed_value, _changes} ->
        {:error, {reason, failed_value}}
    end
  end

  def mark_messages_as_seen(thread_id) do
    {count, _} =
      from(m in Message,
        where: m.thread_id == ^thread_id,
        where: m.seen == false,
        update: [set: [seen: true]]
      )
      |> Repo.update_all([])

    {:ok, count}
  end

  def delete(thread) do
    Repo.delete(thread)
  end

  def format_thread(%Thread{} = thread), do: {:ok, thread}
  def format_thread(nil), do: {:error, :not_found}
end
