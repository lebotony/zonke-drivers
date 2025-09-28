import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useMutation } from "@tanstack/react-query";

import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "./styles/messageBox";
import { MessageSchema } from "./schema";
import { sendMessage } from "../actions";

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

  const thread = getUpdatedObjectSnapshot("threads", threadId as string);

  const addMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) =>
      updateAndMoveObjectToTop("threads", threadId as string, {
        last_message: data,
        messages: [...thread?.messages, data],
      }),

    onError: (err) => {
      console.error("Sending Message failed:", err);
      return err;
    },
  });
  const onAddMessage = (params: MessageParams) =>
    addMessageMutation.mutate(params);

  const onSubmit = (data: MessageFormValues) => {
    const params = {
      ...data,
      content: data.content.trim(),
      recipient_id: recipientId,
      thread_id: threadId,
    };

    onAddMessage(params);
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
