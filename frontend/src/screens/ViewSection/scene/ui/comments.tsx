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
      <CustomButton onPress={setShowCommentModal} style={styles.addCommentRow}>
        <Text style={styles.addCommentText}>+ ADD A COMMENT</Text>
      </CustomButton>

      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(v, index) => String(index)}
        renderItem={({ item }) => <Comment />}
      />
    </View>
  );
};
