import React, { useEffect } from "react";
import {
  View,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";

import { find, isEmpty } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/ui";
import { IS_IOS } from "@/constants/srcConstants";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { ChatMessage } from "./chatMessage";
import { MessageBox } from "./messageBox";
import { styles } from "./styles/index";
import { fetchThreadMessages, setSeenTrue } from "../actions";
import { useMessages } from "../MessagesProvider";

export const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const threadId = Array.isArray(id) ? id[0] : id;

  const { onSetCurrentThread, currentThreadId } = useMessages();
  const { getCachedData } = useCustomQuery();
  const {
    threads,
    user,
    fetchedMsgThreadIds,
    messagesPagination,
    threadChannels,
  } = getCachedData([
    "threads",
    "user",
    "fetchedMsgThreadIds",
    "messagesPagination",
    "threadChannels",
  ]);

  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {
    updatePaginatedObject,
    updateNestedPagination,
    onFetchNestedPagination,
    getUpdatedObjectSnapshot,
  } = usePaginatedCache();

  const thread = find(threads, { id: threadId });
  const recipient = find(
    thread?.thread_participants,
    (thd_part) => thd_part.participant.id !== user?.id,
  )?.participant;

  const isNewThread = isEmpty(thread?.last_message);

  if (!currentThreadId) onSetCurrentThread(threadId);

  // console.log("CHAT USER_ID: ", user?.id);
  // console.log("CHAT RECIPIENT_ID: ", recipient?.id);
  // console.log("THREAD THREAD: ", thread);
  // console.log("FETCHED FETCHED: ", fetchedMsgThreadIds);

  const loadThreadMessages = (messagesObj: Record<string, any>) => {
    updateNestedPagination(
      threadId,
      "messagesPagination",
      messagesObj.paginate,
    );

    const messages = messagesObj?.data ?? [];
    const threadSnapshot = getUpdatedObjectSnapshot("threads", threadId);

    if (Array.isArray(messages) && !isEmpty(messages)) {
      const existingMessages = threadSnapshot?.messages ?? [];

      const existingIds = new Set(existingMessages.map((m: any) => m.id));

      // Filter out duplicates
      const newMessages = messages.filter(
        (msg: any) => !existingIds.has(msg.id),
      );

      // Only update if there are non-duplicate messages
      if (newMessages.length > 0) {
        // Sort only the new messages to ensure they're in correct order
        const sortedNewMessages = newMessages.sort((a: any, b: any) => {
          const timeA = new Date(a.created_at).getTime();
          const timeB = new Date(b.created_at).getTime();
          return timeB - timeA; // Descending: newest first
        });

        // Append older messages to the end (they appear at top in inverted list)
        const combinedMessages = [...existingMessages, ...sortedNewMessages];

        updatePaginatedObject("threads", messages[0].thread_id, {
          messages: combinedMessages,
        });
      }
    }
  };

  const handleSetFetchedMsgThreadIds = (id: string) =>
    queryClient.setQueryData(
      ["fetchedMsgThreadIds"],
      (fetchedMsgThreadIds: Thread["id"][]) => [
        ...(fetchedMsgThreadIds ?? []),
        id,
      ],
    );

  const onResetUnseenCount = (threadId: string) =>
    setSeenTrue(threadId)
      .then((res) => {
        updatePaginatedObject("threads", threadId, { unseen_msg_count: 0 });

        if (threadChannels?.[threadId]) {
          threadChannels[threadId].push("msg_seen_status_changed", {
            thread_id: threadId,
          });
        } else {
          console.warn(`No channel for thread ${threadId} to mark seen`);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

  const handleFetchMessages = () => {
    if (!threadId) return;

    const { pageParam } = onFetchNestedPagination(
      threadId,
      "messagesPagination",
    );

    fetchThreadMessages({
      pageParam,
      threadId,
    }).then((res) => {
      !isEmpty(res) && loadThreadMessages(res);
      handleSetFetchedMsgThreadIds(threadId);
    });
  };

  useEffect(() => {
    if (isNewThread) return;

    if (!fetchedMsgThreadIds?.includes(threadId)) handleFetchMessages();

    if (thread?.unseen_msg_count ?? 0 > 0) {
      onResetUnseenCount(threadId);
    }
  }, []);

  const onGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            ]}
            onPress={onGoBack}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.darkCharcoalGrey}
            />
          </Pressable>
          <Image
            source={recipient?.asset_url}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {recipient?.first_name} {recipient?.last_name}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={IS_IOS ? "padding" : "height"}
        keyboardVerticalOffset={IS_IOS ? 0 : 20}
      >
        <View style={styles.content}>
          <FlatList
            data={thread?.messages}
            inverted
            onEndReached={() => {
              const paginationObj = find(messagesPagination, {
                id: threadId,
              })?.paginate;

              if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
                handleFetchMessages();
              }
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const isLast = index === 0;
              const messages = thread?.messages || [];
              const nextMessage = messages[index + 1];

              const isGrouped = nextMessage?.author_id === item.author_id;

              return (
                <ChatMessage
                  message={item}
                  recipient={recipient}
                  user={user}
                  isLast={isLast}
                  isGrouped={isGrouped}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end",
              paddingTop: 12,
            }}
          />
        </View>

        <MessageBox
          recipientId={recipient?.id as string}
          threadId={thread?.id}
          isNewThread={isNewThread}
          user={user}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
