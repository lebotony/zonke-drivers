import React, {
  ReactNode,
  createContext,
  useContext,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSegments } from "expo-router";
import { Channel } from "phoenix";
import { find } from "lodash";

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { fetchUserThreads } from "./actions";
import { messageSeen, newMessage } from "./utils/channels";
import { useDebounce } from "use-debounce";

const MessagesContext = createContext<
  | {
      hasNextPage: boolean;
      isFetchingNextPage: boolean;
      currentThreadId: string | undefined;
      onSetCurrentThread: (threadId: string | undefined) => void;
      initiateChannels: (threads: Thread[]) => void;
      onSetSearchTerm: (value: string) => void;
      fetchNextPage: (
        options?: FetchNextPageOptions | undefined,
      ) => Promise<
        InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
      >;
    }
  | undefined
>(undefined);

type MessagesProviderProps = {
  children: ReactNode;
};

export const MessagesProvider: FC<MessagesProviderProps> = (props) => {
  const { children } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const threadChannelsRef = useRef<Record<string, Channel>>({});
  const baseChannelRef = useRef<Channel | undefined>(undefined);
  const currentThreadRef = useRef<string | undefined>(undefined);

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { user, socket, userChannel, threadChannels } = getCachedData([
    "user",
    "socket",
    "userChannel",
    "threadChannels",
  ]);

  const segments = useSegments();
  const {
    updatePaginatedObject,
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
    addItemToPaginatedList,
  } = usePaginatedCache();

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      search_term: debouncedSearchTerm,
    };

    return fetchUserThreads({ pageParam }, filters);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["threads"],
      queryFn: queryFn,
      enabled: !!user?.id,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;

        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const threads = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [debouncedSearchTerm, user?.id]);

  useEffect(() => {
    if (!threads || !socket) return;
    initiateChannels(threads);
  }, [threads, socket]);

  const initiateChannels = (threads: Thread[]) => {
    return threads.forEach((thread) => {
      if (!socket) return;

      if (threadChannelsRef.current[thread?.id]) return;

      const channel = socket.channel(`chats:${thread?.id}`);

      channel
        .join()
        .receive("ok", () => {
          // console.log(`Joined chats:${thread.id} successfully`);
          // channel.push("broadcast_to_my_chats", {
          //   event: "participant_joined",
          // });
        })
        .receive("error", (err: Error) => console.log("Unable to join", err));

      baseChannelRef.current = channel;
      threadChannelsRef.current[thread?.id] = channel;

      queryClient.setQueryData(["threadChannels"], threadChannelsRef?.current);
      setupChannelHandlers(channel);
    });
  };

  const setCurrentThread = (threadId: string | undefined) => {
    currentThreadRef.current = threadId;
  };

  const handleSetSearchTerm = (value: string) => setSearchTerm(value);

  const setupChannelHandlers = (channel: Channel) => {
    channel.on("new_message", (payload: Message) =>
      newMessage(
        updateAndMoveObjectToTop,
        getUpdatedObjectSnapshot,
        channel,
        payload,
        user?.id,
        currentThreadRef.current,
      ),
    );

    channel.on("message_seen", (payload: { thread_id: string }) =>
      messageSeen(updatePaginatedObject, getUpdatedObjectSnapshot, payload),
    );
  };

  useEffect(() => {
    if (segments[0] === "(tabs)" && currentThreadRef.current) {
      currentThreadRef.current = undefined;
    }
  }, [segments]);

  useEffect(() => {
    if (!user || !socket || !userChannel) return;

    const handleNewThread = (payload: Thread) => {
      console.log("New THREAD received: ", payload);

      const cachedThreadChannels: any = queryClient.getQueryData([
        "threadChannels",
      ]);
      const cachedData: any = queryClient.getQueryData(["threads"]);
      const currentThreads =
        cachedData?.pages?.flatMap((page: any) => page.data) ?? [];

      if (find(currentThreads, { id: payload?.id })) {
        newMessage(
          updateAndMoveObjectToTop,
          getUpdatedObjectSnapshot,
          cachedThreadChannels?.[payload?.id as string],
          payload.last_message,
          user?.id,
          currentThreadRef.current,
        );
      } else {
        addItemToPaginatedList("threads", payload);
      }

      initiateChannels([payload]);
    };

    userChannel.on("new_thread", handleNewThread);

    return () => {
      try {
        userChannel?.off && userChannel.off("new_thread", handleNewThread);
        userChannel?.leave();
      } catch (e) {
        // ignore errors during cleanup
      }

      baseChannelRef.current = undefined;

      Object.values(threadChannelsRef.current).forEach((channel: Channel) => {
        channel.leave();
      });
      threadChannelsRef.current = {};
    };
  }, [user, socket, userChannel]);

  const value = {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    onSetCurrentThread: setCurrentThread,
    currentThreadId: currentThreadRef.current,
    initiateChannels,
    onSetSearchTerm: handleSetSearchTerm,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
