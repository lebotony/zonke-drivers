import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "./styles/messageBox";
import { MessageSchema } from "./schema";
import { useCustomQuery } from "@/src/useQueryContext";

type MessageFormValues = z.infer<typeof MessageSchema>;

type MessageBoxProps = {
  recipientId: string;
  threadId: string | undefined;
};

export const MessageBox = (props: MessageBoxProps) => {
  const { recipientId, threadId } = props;

  const { updateAndMoveObjectToTop, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const { control, handleSubmit } = useForm<MessageFormValues>({
    resolver: zodResolver(MessageSchema),
  });

  const { getCachedData } = useCustomQuery();
  const { threadChannels } = getCachedData(["threadChannels"]);

  const thread = getUpdatedObjectSnapshot("threads", threadId as string);

  const sendMessage = (params: Partial<Message>) => {
    threadChannels[threadId as string]
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

  const onSubmit = (data: MessageFormValues) => {
    const params = {
      ...data,
      content: data.content.trim(),
      recipient_id: recipientId,
      thread_id: threadId,
    };

    sendMessage(params);
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
