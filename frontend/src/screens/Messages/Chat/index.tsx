import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";

import { find, isEmpty } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/ui";
import { IS_IOS } from "@/constants/srcConstants";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { ChatMessage } from "./chatMessage";
import { MessageBox } from "./messageBox";
import { styles } from "./styles/index";
import { fetchThreadMessages, setSeenTrue } from "../actions";

export const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const threadId = Array.isArray(id) ? id[0] : id;

  const { getCachedData } = useCustomQuery();
  const { threads, user, fetchedMsgThreadIds, threadChannels } = getCachedData([
    "threads",
    "user",
    "fetchedMsgThreadIds",
    "threadChannels",
  ]);

  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const { updatePaginatedObject } = usePaginatedCache();

  const thread = find(threads, { id: threadId });
  const recipient = find(
    thread?.thread_participants,
    (thd_part) => thd_part.participant.id !== user?.id
  )?.participant;

  const isNewThread = isEmpty(thread?.last_message);

  // console.log("CHAT USER_ID: ", user?.id);
  // console.log("CHAT RECIPIENT_ID: ", recipient?.id);

  const loadThreadMessages = (messages: Message[]) => {
    if (Array.isArray(messages) && !isEmpty(messages)) {
      updatePaginatedObject("threads", messages[0].thread_id, { messages });
    }
  };

  const handleSetFetchedMsgThreadIds = (id: string) =>
    queryClient.setQueryData(
      ["fetchedMsgThreadIds"],
      (fetchedMsgThreadIds: Thread["id"][]) => [
        ...(fetchedMsgThreadIds ?? []),
        id,
      ]
    );

  const resetUnseenCountMutation = useMutation({
    mutationFn: setSeenTrue,
    onSuccess: (_data, variables: Thread["id"]) => {
      updatePaginatedObject("threads", variables, { unseen_msg_count: 0 });

      if (threadChannels?.[variables]) {
        threadChannels[variables].push("msg_seen_status_changed", {
          thread_id: variables,
        });
      } else {
        console.warn(`No channel for thread ${variables} to mark seen`);
      }
    },
  });
  const onResetUnseenCount = (threadId: string) =>
    resetUnseenCountMutation.mutate(threadId);

  useEffect(() => {
    if (isNewThread) {
      return;
    }

    if (!fetchedMsgThreadIds?.includes(threadId)) {
      fetchThreadMessages(threadId).then((res: Message[]) => {
        !isEmpty(res) && loadThreadMessages(res);
        handleSetFetchedMsgThreadIds(threadId);
      });
    }

    if (thread?.unseen_msg_count ?? 0 > 0) {
      onResetUnseenCount(threadId);
    }

    flatListRef.current?.scrollToEnd({ animated: false });
  }, []);

  const onGoBack = () => navigation.goBack();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: IS_IOS ? 35 : 30 }]}>
      <View style={styles.header}>
        <Pressable style={{ marginRight: 12 }} onPress={onGoBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={Colors.darkCharcoal}
          />
        </Pressable>
        <Image
          source={recipient?.asset_url}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {recipient?.first_name} {recipient?.last_name}
          </Text>
          {/* <Text style={styles.status}>Online</Text> */}
        </View>
        {/* <Feather name="more-vertical" size={22} color={Colors.mediumDarkGrey} /> */}
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={IS_IOS ? "padding" : undefined}
        keyboardVerticalOffset={IS_IOS ? 90 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.dateDivider}>Today</Text>
          <FlatList
            ref={flatListRef}
            data={thread?.messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const isLast = index === (thread?.messages.length ?? 0) - 1;

              return (
                <ChatMessage
                  message={item}
                  recipient={recipient}
                  user={user}
                  isLast={isLast}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        </View>

        <MessageBox
          recipientId={recipient?.id as string}
          threadId={thread?.id}
          isNewThread={isNewThread}
          user={user}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
