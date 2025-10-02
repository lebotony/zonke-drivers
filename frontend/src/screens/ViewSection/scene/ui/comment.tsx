import { View, Text } from "react-native";

import { styles } from "../styles/comment";

type CommentProps = {
  // comment: CommentType;
};

export const Comment = (props: CommentProps) => {
  // const { comment } = props;

  return (
    <View style={styles.commentBox}>
      <View style={styles.commentHeader}>
        {/* <Text style={styles.commentName}>{comment.name}</Text> */}
        <Text style={styles.commentName}>Lebohang Mdlongwa</Text>

        {/* <Text style={styles.commentDate}>{comment.date}</Text> */}
        <Text style={styles.commentDate}>02 Sep</Text>
      </View>
      {/* <Text style={styles.commentText}>{comment.text}</Text> */}
      <Text style={styles.commentText}>You drive like shit</Text>

      <View style={styles.commentActions}>
        {/* <Text style={styles.commentAction}>👍 {comment.likes}</Text> */}
        <Text style={styles.commentAction}>👍 23</Text>

        {/* <Text style={styles.commentAction}>💬 {comment.replies}</Text> */}
        <Text style={styles.commentAction}>💬 7</Text>
      </View>
    </View>
  );
};
