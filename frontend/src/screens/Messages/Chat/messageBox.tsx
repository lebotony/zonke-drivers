import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "./styles/messageBox";
import { MessageSchema } from "./schema";
import { useCustomQuery } from "@/src/useQueryContext";
import { Channel, Socket } from "phoenix";

type MessageFormValues = z.infer<typeof MessageSchema>;

type MessageBoxProps = {
  recipientId: string;
  threadId: string | undefined;
  isNewThread: boolean;
  socket: Socket | null;
};

export const MessageBox = (props: MessageBoxProps) => {
  const { recipientId, threadId, isNewThread, socket } = props;
  const [newChannelJoined, setNewChannelJoined] = useState(false);

  const { updateAndMoveObjectToTop, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const { control, handleSubmit } = useForm<MessageFormValues>({
    resolver: zodResolver(MessageSchema),
  });

  const { getCachedData } = useCustomQuery();
  const { threadChannels } = getCachedData(["threadChannels"]);

  const thread = getUpdatedObjectSnapshot("threads", threadId as string);

  const sendAndUpdateThreads = (channel: Channel, params: Partial<Message>) => {
    channel
      .push("send_message", {
        params: params,
      })
      .receive("ok", (payload: { message: Partial<Message> }) => {
        updateAndMoveObjectToTop("threads", threadId as string, {
          last_message: payload.message,
          messages: [...(thread?.messages ?? []), payload.message],
        });
      })
      .receive("error", (err: Error) => {
        console.error("Failed to send message:", err);
      })
      .receive("timeout", () => {
        console.warn("Message push timed out");
      });
  };

  const sendToNewThread = (params: Partial<Message>) => {
    const channel = socket?.channel(`chats:${thread.id}`);

    if (!newChannelJoined && channel) {
      channel
        ?.join()
        .receive("ok", () => {
          setNewChannelJoined(true);
          console.log(`Joined chats:${thread.id} successfully`);
          sendAndUpdateThreads(channel, params);
        })
        .receive("error", (err: Error) => console.log("Unable to join", err));
    } else if (channel) {
      sendAndUpdateThreads(channel, params);
    }
  };

  const sendMessage = (params: Partial<Message>) => {
    if (threadChannels?.[threadId as string]) {
      sendAndUpdateThreads(threadChannels?.[threadId as string], params);
    } else {
      console.warn(`No channel for thread ${threadId} to mark seen`);
    }
  };

  const onSubmit = (data: MessageFormValues) => {
    const params = {
      ...data,
      content: data.content.trim(),
      recipient_id: recipientId,
      thread_id: threadId,
    };

    isNewThread ? sendToNewThread(params) : sendMessage(params);
  };

  return (
    <View style={styles.container}>
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
        style={styles.sendButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
