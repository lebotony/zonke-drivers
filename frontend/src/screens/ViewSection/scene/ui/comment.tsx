import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { styles } from "../styles/comment";

type CommentProps = {
  comment?: CommentType;
};

const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.charAt(0)?.toUpperCase() || "";
  const last = lastName?.charAt(0)?.toUpperCase() || "";
  return `${first}${last}`;
};

export const Comment = (props: CommentProps) => {
  const { comment } = props;

  const initials = getInitials(comment?.first_name, comment?.last_name);

  return (
    <View style={styles.commentCard}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <View style={styles.authorSection}>
            <Text style={styles.authorName}>
              {comment?.first_name} {comment?.last_name}
            </Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.timestamp}>{comment?.sent_at}</Text>
          </View>
        </View>

        <Text style={styles.commentText}>{comment?.text}</Text>
      </View>
    </View>
  );
};
