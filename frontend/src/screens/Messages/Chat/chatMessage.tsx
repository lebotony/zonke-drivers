import React from "react";
import { View, ViewStyle, Pressable } from "react-native";
import { Text } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

import { styles } from "./styles/chatMessage";

type ChatProps = {
  message?: Message;
  recipient: Participant | undefined;
  user?: { id: string };
  isLast: boolean;
  isGrouped?: boolean;
};

export const ChatMessage = (props: ChatProps) => {
  const { message, user, isGrouped = false } = props;
  const isAuthor = message?.author_id === user?.id;
  const tickColor = message?.seen
    ? Colors.white
    : "rgba(255, 255, 255, 0.7)";

  const customStyle = {
    alignItems: `${isAuthor ? "flex-end" : "flex-start"}`,
  } as ViewStyle;

  return (
    <View style={{ alignItems: customStyle.alignItems }}>
      <Pressable
        style={({ pressed }) => [
          styles.chatMessage,
          isGrouped && styles.chatMessageGrouped,
          isAuthor ? styles.chatMessageAuthor : styles.chatMessageReceived,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={[
          styles.messageText,
          isAuthor && styles.messageTextAuthor,
        ]}>
          {message?.content}
        </Text>
        <View style={styles.messageMetaRow}>
          <Text style={[
            styles.messageTime,
            isAuthor && styles.messageTimeAuthor,
          ]}>
            {message?.sent_at}
          </Text>
          {isAuthor && (
            <MaterialCommunityIcons
              name="check-all"
              size={14}
              color={tickColor}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};
