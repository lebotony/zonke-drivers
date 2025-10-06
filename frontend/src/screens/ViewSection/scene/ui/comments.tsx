import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";

import { CustomButton } from "@/src/components/elements/button";

import { styles } from "../styles/comments";
import { Comment } from "./comment";

type CommentsProps = {
  setShowCommentModal: VoidCallback;
};

export const Comments = (props: CommentsProps) => {
  const { setShowCommentModal } = props;

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.commentsTitle}>Comments</Text>
      <CustomButton onPress={setShowCommentModal} style={styles.addCommentRow}>
        <Text style={styles.addCommentText}>+ ADD A COMMENT</Text>
      </CustomButton>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2, 3, 4]}
        keyExtractor={(v, index) => String(index)}
        renderItem={({ item }) => <Comment />}
      />
    </View>
  );
};
