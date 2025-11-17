import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { styles } from "../styles/comment";

type CommentProps = {
  comment?: CommentType;
};

export const Comment = (props: CommentProps) => {
  const { comment } = props;

  // const renderReply = ({ item }: any) => (
  //   <View style={styles.replyItem}>
  //     <Text style={styles.replyName}>
  //       {item.name} <Text style={styles.smallText}>· {item.date}</Text>
  //     </Text>
  //     <Text style={styles.replyText}>{item.text}</Text>
  //   </View>
  // );

  return (
    <View style={styles.commentBox}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentName}>
          {comment?.first_name} {comment?.last_name}
        </Text>
        <Text style={styles.commentDate}>{comment?.sent_at}</Text>
      </View>
      <Text style={styles.commentText}>{comment?.text}</Text>

      {/* <View style={styles.commentActions}>
        <TouchableOpacity
          onPress={() => {
            (setShowReplies((s) => !s), setReplying(false));
          }}
          style={styles.replies}
        > */}
      {/* <MaterialIcons
            name={showReplies ? "keyboard-arrow-down" : "keyboard-arrow-left"}
            size={18}
            color={showReplies ? Colors.mrDBlue : Colors.charcoalGray}
          /> */}
      {/* <Text style={[styles.viewText, showReplies && styles.replyToggle]}>
            {showReplies
              ? `Hide replies (${replies.length})`
              : `View replies (${replies.length})`}
          </Text> */}
      {/* </TouchableOpacity> */}

      {/* <View style={styles.actionIcons}>
          <TouchableOpacity onPress={() => setReplying(!replying)}>
            <Text style={styles.commentAction}>💬 Reply</Text>
          </TouchableOpacity>
        </View> */}
      {/* </View> */}

      {/* {showReplies && (
        <View style={styles.replyList}>
          <FlatList
            // data={replies}
            keyExtractor={(item) => item.id}
            renderItem={renderReply}
            scrollEnabled={false}
          />
        </View>
      )} */}

      {/* {replying && (
        <View style={styles.replyBox}>
          <Text style={styles.replyTitle}>Reply Lebohang Mdlongwa</Text>
          <TextInput
            value={replyText}
            onChangeText={setReplyText}
            placeholder="Write a reply..."
            style={styles.replyInput}
            multiline
          />
          <Pressable onPress={addReply} style={styles.replySend}>
            <Ionicons name="send" size={20} color="white" />
          </Pressable>
        </View>
      )} */}
    </View>
  );
};
