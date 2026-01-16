import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { find } from "lodash";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Toast from "react-native-toast-message";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";

import { styles } from "./styles/messageBox";
import { MessageSchema } from "./schema";
import { useMessages } from "../MessagesProvider";
import { removeTrailingWhitespace } from "@/src/utils";
import { IS_IOS } from "@/constants/srcConstants";

type MessageFormValues = z.infer<typeof MessageSchema>;

type MessageBoxProps = {
  recipientId: string;
  threadId: string | undefined;
  isNewThread: boolean;
  user: User;
};

export const MessageBox = (props: MessageBoxProps) => {
  const { recipientId, threadId, isNewThread, user } = props;
  const insets = useSafeAreaInsets();

  const {
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
    addItemToPaginatedList,
  } = usePaginatedCache();

  const { control, handleSubmit, reset } = useForm<MessageFormValues>({
    resolver: zodResolver(MessageSchema),
  });

  const [isSending, setIsSending] = useState(false);

  const { initiateChannels } = useMessages();
  const { getCachedData } = useCustomQuery();
  const { threadChannels, userChannel, threads, socket } = getCachedData([
    "threadChannels",
    "userChannel",
    "threads",
    "socket",
  ]);

  const thread = getUpdatedObjectSnapshot("threads", threadId as string);

  const isConnectionHealthy = () => {
    if (!socket?.isConnected()) {
      console.warn("Socket not connected");
      return false;
    }

    const channel = threadChannels?.[threadId as string];
    if (!channel) {
      return true; // Will use userChannel for new threads
    }

    // Phoenix channel states: "closed", "errored", "joined", "joining", "leaving"
    if (channel.state !== "joined") {
      console.warn(`Channel state is ${channel.state}, not joined`);
      return false;
    }

    return true;
  };

  const sendToNewThread = (params: Partial<Message>, retries = 3) => {
    if (!userChannel) {
      console.warn(`No channel for thread ${threadId}`);
      console.warn("userChannel is undefined");
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: "Unable to connect. Please try again.",
      });
      return;
    }

    if (!isConnectionHealthy() && retries === 3) {
      Toast.show({
        type: "error",
        text1: "Connection Issue",
        text2: "Reconnecting... Please wait.",
      });
      setTimeout(() => sendToNewThread(params, retries), 2000);
      return;
    }

    setIsSending(true);
    userChannel
      .push("send_message_to_new_thread", {
        params: params,
      }, 10000)
      .receive("ok", (payload: { thread: Thread }) => {
        if (find(threads, { id: payload.thread.id })) {
          updateAndMoveObjectToTop("threads", threadId as string, {
            last_message: payload.thread.last_message,
            messages: [
              ...(thread?.messages ?? []),
              payload.thread.last_message,
            ],
          });

          initiateChannels([payload.thread]);
        } else {
          addItemToPaginatedList("threads", payload.thread);
        }

        reset();
        setIsSending(false);
      })
      .receive("error", (err: Error) => {
        console.error("Failed to send message:", err);
        if (retries > 0) {
          console.log(`Retrying... (${retries} attempts left)`);
          setTimeout(() => sendToNewThread(params, retries - 1), 2000);
        } else {
          setIsSending(false);
          Toast.show({
            type: "error",
            text1: "Message Failed",
            text2: "Unable to send message. Please check your connection.",
          });
        }
      })
      .receive("timeout", () => {
        console.warn("Message push timed out");
        if (retries > 0) {
          console.log(`Retrying after timeout... (${retries} attempts left)`);
          setTimeout(() => sendToNewThread(params, retries - 1), 2000);
        } else {
          setIsSending(false);
          Toast.show({
            type: "error",
            text1: "Message Timed Out",
            text2: "Connection timeout. Please try again.",
          });
        }
      });
  };

  const sendMessage = (params: Partial<Message>, retries = 3) => {
    const channel = threadChannels?.[threadId as string];

    if (!channel) {
      sendToNewThread(params, retries);
      return;
    }

    if (!isConnectionHealthy() && retries === 3) {
      Toast.show({
        type: "error",
        text1: "Connection Issue",
        text2: "Reconnecting... Please wait.",
      });
      setTimeout(() => sendMessage(params, retries), 2000);
      return;
    }

    setIsSending(true);
    channel
      .push("send_message", {
        params: params,
      }, 10000)
      .receive("ok", (payload: { message: Partial<Message> }) => {
        updateAndMoveObjectToTop("threads", threadId as string, {
          last_message: payload.message,
          messages: [payload.message, ...(thread?.messages ?? [])],
        });

        reset();
        setIsSending(false);
      })
      .receive("error", (err: Error) => {
        console.error("Failed to send message:", err);
        if (retries > 0) {
          console.log(`Retrying... (${retries} attempts left)`);
          setTimeout(() => sendMessage(params, retries - 1), 2000);
        } else {
          setIsSending(false);
          Toast.show({
            type: "error",
            text1: "Message Failed",
            text2: "Unable to send message. Please check your connection.",
          });
        }
      })
      .receive("timeout", () => {
        console.warn("Message push timed out");
        if (retries > 0) {
          console.log(`Retrying after timeout... (${retries} attempts left)`);
          setTimeout(() => sendMessage(params, retries - 1), 2000);
        } else {
          setIsSending(false);
          Toast.show({
            type: "error",
            text1: "Message Timed Out",
            text2: "Connection timeout. Please try again.",
          });
        }
      });
  };

  const onSubmit = (data: MessageFormValues) => {
    const params = {
      ...data,
      content: removeTrailingWhitespace(data.content.trim()),
      recipient_id: recipientId,
      thread_id: threadId,
    };

    isNewThread ? sendToNewThread(params) : sendMessage(params);
  };

  return (
    <View
      style={[
        styles.container,
        IS_IOS && insets.bottom > 0 && { marginBottom: insets.bottom + 5 },
      ]}
    >
      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              style={styles.input}
              multiline={true}
              textAlignVertical="top"
              placeholder="Type your message..."
              placeholderTextColor="#888"
              value={value || ""}
              onChangeText={onChange}
            />
          );
        }}
      />
      <TouchableOpacity
        style={[styles.sendButton, isSending && { opacity: 0.5 }]}
        onPress={isSending ? undefined : handleSubmit(onSubmit)}
        disabled={isSending}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
