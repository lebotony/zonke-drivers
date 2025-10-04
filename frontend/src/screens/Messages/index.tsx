import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSegments } from "expo-router";

import { Channel, Socket } from "phoenix";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { initializeSocket } from "@/src/socket";
import { SearchComponent } from "@/src/components/searchBar";
import { Spinner } from "@/src/components/elements/Spinner";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { Message } from "./message";
import { fetchUserThreads } from "./actions";
import { styles } from "./styles/index";
import {
  messageSeen,
  newMessage,
  participantJoined,
  participantLeft,
} from "./utils/channels";

const TABS = ["All", "Unread", "Archived", "Starred"];

export const MessagesScreen = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [socket, setSocket] = useState<Socket | null>(null);

  const threadChannelsRef = useRef<Record<string, Channel>>({});
  const baseChannelRef = useRef<Channel | undefined>(undefined);
  const activeThreadIdRef = useRef<string | undefined>(undefined);

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);

  const segments = useSegments();
  const {
    updatePaginatedObject,
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
  } = usePaginatedCache();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["threads"],
      queryFn: fetchUserThreads,
      getNextPageParam: (lastPage) => {
        const { page, max_page }: { page: number; max_page: number } =
          lastPage?.paginate;
        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const threads = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    let mounted = true;

    initializeSocket().then((sock) => {
      if (mounted) setSocket(sock);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!threads || !socket) return;
    initiateChannels(threads);
  }, [threads, socket]);

  const initiateChannels = (threads: Thread[]) => {
    return threads.forEach((thread) => {
      if (!socket) return;

      const channel = socket.channel(`chats:${thread.id}`);

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
      threadChannelsRef.current[thread.id] = channel;

      queryClient.setQueryData(["threadChannels"], threadChannelsRef?.current);
      setupChannelHandlers(channel);
    });
  };

  const setActiveThreadIdRef = (threadId: string | undefined) => {
    activeThreadIdRef.current = threadId;
  };

  const setupChannelHandlers = (channel: Channel) => {
    channel.on("participant_joined", (payload: { participant_id: string }) =>
      participantJoined(updatePaginatedObject, payload, queryClient, user?.id)
    );

    channel.on("participant_left", (payload: { participant_id: string }) =>
      participantLeft(updatePaginatedObject, payload, queryClient, user?.id)
    );

    channel.on("new_message", (payload: Message) =>
      newMessage(
        updateAndMoveObjectToTop,
        getUpdatedObjectSnapshot,
        channel,
        payload,
        user?.id,
        activeThreadIdRef.current
      )
    );

    channel.on("message_seen", (payload: { thread_id: string }) =>
      messageSeen(updatePaginatedObject, getUpdatedObjectSnapshot, payload)
    );
  };

  useEffect(() => {
    if (segments[0] === "(tabs)" && activeThreadIdRef.current) {
      activeThreadIdRef.current = undefined;
    }
  }, [segments]);

  useEffect(() => {
    if (!user || !socket) return;

    queryClient.setQueryData(["socket"], socket);
    const userChannel = socket.channel(`users:${user.id}`);

    userChannel
      .join()
      .receive("ok", () => console.log(`Joined user:${user.id} successfully`))
      .receive("error", (err: Error) => console.log("Unable to join", err));

    userChannel.on("new_thread", (payload: { thread: Thread }) => {
      console.log("New thread received: ", payload.thread);

      queryClient.setQueryData(["threads"], (threads: Thread[]) => [
        payload.thread,
        ...(threads || []),
      ]);
    });

    return () => {
      userChannel.leave();

      // baseChannelRef.current?.push("broadcast_to_my_chats", {
      //   event: "participant_left",
      // });
      baseChannelRef.current = undefined;

      Object.values(threadChannelsRef.current).forEach((channel: Channel) => {
        channel.leave();
      });
      threadChannelsRef.current = {};
    };
  }, [user]);

  if (!threads) return <Spinner />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <SearchComponent
        placeholder="Search Contacts"
        height={36}
        customStyle={{ paddingHorizontal: 15 }}
      />
      <View style={styles.tabsRow}>
        {TABS.map((tab, idx) => (
          <Pressable
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(idx)}
          >
            <Text
              style={[styles.tabText, activeTab === idx && styles.tabActive]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        style={styles.messageList}
        data={threads as Thread[]}
        keyExtractor={(thread) => thread.id}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Message
            setActiveThreadIdRef={setActiveThreadIdRef}
            activeThreadId={activeThreadIdRef.current}
            thread={item}
            user={user}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
