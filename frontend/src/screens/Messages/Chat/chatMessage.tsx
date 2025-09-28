import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/ui';

import { styles } from './styles/chatMessage';

type ChatProps = {
  message?: Message;
  recipient: Participant | undefined;
  user?: { id: string };
  isLast: boolean;
};

export const ChatMessage = (props: ChatProps) => {
  const { message, user } = props;
  const isAuthor = message?.author_id === user?.id;
  const tickColor = message?.seen ? Colors.blueTicksColor : Colors.mediumDarkGrey;

  const customStyle = {
    alignSelf: `${isAuthor ? 'flex-end' : 'flex-start'}`,
  } as ViewStyle;

  return (
    <View style={[styles.messageRow, { alignSelf: customStyle.alignSelf }]}>
      <View
        style={[
          styles.chatMessage,
          isAuthor && { backgroundColor: Colors.skyLight },
          !isAuthor && { borderBottomLeftRadius: 0 },
          !isAuthor && { borderBottomLeftRadius: 0 },
        ]}
      >
        <Text style={styles.messageText}>{message?.content}</Text>
        <View style={styles.messageMetaRow}>
          <Text style={styles.messageTime}>{message?.sent_at}</Text>
          {isAuthor && <MaterialCommunityIcons name="check-all" size={16} color={tickColor} />}
        </View>
      </View>
    </View>
  );
};
