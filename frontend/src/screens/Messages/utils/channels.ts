import { isArray } from "lodash";
import { Channel } from "phoenix";

import { QueryClient } from "@tanstack/query-core";

import { setSeenTrue } from "../actions";

export const participantJoined = (
  updatePaginatedObject: UpdatePaginatedObjectType,
  payload: Partial<ThreadParticipant>,
  queryClient: QueryClient,
  userId: string
) => {
  if (payload.participant_id === userId) return; // Remove this line when you find a way to avoid sending event to self()
  // console.log(`PARTICIPANT ${payload.participant_id}`);

  const threads: any = queryClient.getQueryData(['threads']);
  const threadsList = threads?.pages.flatMap((page: Page) => page.data) ?? [];

  const parti_thread = threadsList?.find((thread: Thread) =>
    thread.thread_participants.some(
      (th_participant: ThreadParticipant) =>
        th_participant.participant_id === payload.participant_id,
    )
  );

  if (!parti_thread.id) return;

  updatePaginatedObject('threads', parti_thread.id, {
    thread_participants: parti_thread.thread_participants.map(
      (thd_participant: ThreadParticipant) => ({
        ...thd_participant,
        online:
          thd_participant.participant_id === payload.participant_id
            ? true
            : thd_participant.online,
      })
    ),
  });
};

export const participantLeft = (
  updatePaginatedObject: UpdatePaginatedObjectType,
  payload: Partial<ThreadParticipant>,
  queryClient: QueryClient,
  userId: string
) => {
  if (payload.participant_id === userId) return;

  const threads: any = queryClient.getQueryData(['threads']);
  const threadsList = threads?.pages.flatMap((page: Page) => page.data) ?? [];

  const parti_thread = threadsList?.find((thread: Thread) =>
    thread.thread_participants.some(
      (th_participant: ThreadParticipant) =>
        th_participant.participant_id === payload.participant_id,
    )
  );

  if (!parti_thread.id) return;

  updatePaginatedObject('threads', parti_thread.id, {
    thread_participants: parti_thread.thread_participants.map(
      (thd_participant: ThreadParticipant) => ({
        ...thd_participant,
        online:
          thd_participant.participant_id === payload.participant_id
            ? false
            : thd_participant.online,
      })
    ),
  });
}

export const newMessage = (
  updateAndMoveObjectToTop: UpdatePaginatedObjectType,
  getUpdatedObjectSnapshot: GetUpdatedObjectSnapshot,
  channel: Channel,
  payload: Message,
  userId: string,
  activeThreadId?: string,
) => {
  if (payload.recipient_id !== userId) return; // Remove this line when you find a way to avoid sending event to self()
  console.log('New message received: ', payload, userId, payload.recipient_id);

  const isMessageFromActiveThread = payload?.thread_id === activeThreadId;

  if (isMessageFromActiveThread) {
    setSeenTrue(payload?.thread_id);
    channel.push('msg_seen_status_changed', { thread_id: payload?.thread_id });
  }

  const thread = getUpdatedObjectSnapshot('threads', payload?.thread_id)

  const baseMessages = isArray(thread?.messages)
    ? thread.messages.map((msg: Message) =>
        isMessageFromActiveThread ? { ...msg, seen: true } : msg,
      )
    : [];

  updateAndMoveObjectToTop('threads', payload?.thread_id, {
    unseen_msg_count: !isMessageFromActiveThread
      ? thread.unseen_msg_count + 1
      : thread.unseen_msg_count,
    last_message: payload,
    messages: [
      ...baseMessages,
      isMessageFromActiveThread ? { ...payload, seen: true } : payload,
    ],
  })
}

export const messageSeen = (
  updatePaginatedObject: UpdatePaginatedObjectType,
  getUpdatedObjectSnapshot: GetUpdatedObjectSnapshot,
  payload: {thread_id: string},
) => {
  // console.log(`Message from Thread ${payload.thread_id} seen`);

  const thread = getUpdatedObjectSnapshot('threads', payload?.thread_id)

  updatePaginatedObject('threads', payload?.thread_id, {
    last_message: { ...thread.last_message, seen: true },
    messages: isArray(thread?.messages)
      ? thread.messages.map((msg: Message) => (msg.seen ? msg : { ...msg, seen: true }))
      : [],
  })
}