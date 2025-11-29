import { View, TextInput, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { find } from "lodash";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";

import { styles } from "./styles/messageBox";
import { MessageSchema } from "./schema";
import { useMessages } from "../MessagesProvider";
import { removeTrailingWhitespace } from "@/src/utils";

type MessageFormValues = z.infer<typeof MessageSchema>;

type MessageBoxProps = {
  recipientId: string;
  threadId: string | undefined;
  isNewThread: boolean;
  user: User;
};

export const MessageBox = (props: MessageBoxProps) => {
  const { recipientId, threadId, isNewThread, user } = props;

  const {
    updateAndMoveObjectToTop,
    getUpdatedObjectSnapshot,
    addItemToPaginatedList,
  } = usePaginatedCache();

  const { control, handleSubmit, reset } = useForm<MessageFormValues>({
    resolver: zodResolver(MessageSchema),
  });

  const { initiateChannels } = useMessages();
  const { getCachedData } = useCustomQuery();
  const { threadChannels, userChannel, threads } = getCachedData([
    "threadChannels",
    "userChannel",
    "threads",
  ]);

  const thread = getUpdatedObjectSnapshot("threads", threadId as string);

  const sendToNewThread = (params: Partial<Message>) => {
    if (userChannel) {
      userChannel
        .push("send_message_to_new_thread", {
          params: params,
        })
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
        })
        .receive("error", (err: Error) => {
          console.error("Failed to send message:", err);
        })
        .receive("timeout", () => {
          console.warn("Message push timed out");
        });
    } else {
      console.warn(`No channel for thread ${threadId}`);
      console.warn("userChannel is undefined");
    }
  };

  const sendMessage = (params: Partial<Message>) => {
    if (threadChannels?.[threadId as string]) {
      threadChannels?.[threadId as string]
        .push("send_message", {
          params: params,
        })
        .receive("ok", (payload: { message: Partial<Message> }) => {
          updateAndMoveObjectToTop("threads", threadId as string, {
            last_message: payload.message,
            messages: [payload.message, ...(thread?.messages ?? [])],
          });

          reset();
        })
        .receive("error", (err: Error) => {
          console.error("Failed to send message:", err);
        })
        .receive("timeout", () => {
          console.warn("Message push timed out");
        });
    } else {
      sendToNewThread(params);
    }
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
