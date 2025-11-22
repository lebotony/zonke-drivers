import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";

import { router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/ui";

import { styles } from "./styles/message";

type MessageProps = {
  currentThreadId?: string;
  thread?: Thread;
  user?: { id: string };
  onSetCurrentThread: (threadId: string) => void;
};

export const Message = (props: MessageProps) => {
  const { thread, user, onSetCurrentThread, currentThreadId } = props;

  const isAuthor = thread?.last_message?.author_id === user?.id;
  const thd_participants = thread?.thread_participants;
  const recipient = thd_participants?.filter(
    (thd_part) => thd_part.participant.id != user?.id
  )[0].participant;
  const tickColor = thread?.last_message?.seen
    ? Colors.blueTicksColor
    : Colors.mediumDarkGrey;

  const handlePressChat = () => {
    if (thread?.id) {
      router.push(`/chats/${thread.id}`);
      onSetCurrentThread(thread.id);
    }
  };

  if (!thread) return;

  return (
    <TouchableOpacity style={[styles.messageItem]} onPress={handlePressChat}>
      <View style={{ position: "relative" }}>
        <Image
          source={recipient?.asset_url}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageNameRow}>
          <Text style={styles.messageName}>
            {recipient?.first_name} {recipient?.last_name}
          </Text>
          <Text style={styles.messageTime}>{thread.last_message.sent_at}</Text>
        </View>
        <View style={styles.messageTextRow}>
          <Text style={styles.messageText} numberOfLines={1}>
            {thread.last_message.content}
          </Text>
          {thread.unseen_msg_count > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {thread.unseen_msg_count}
              </Text>
            </View>
          )}
          {isAuthor && (
            <MaterialCommunityIcons
              name="check-all"
              size={16}
              color={tickColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
