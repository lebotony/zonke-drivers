import { View, Text } from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

import { Modal } from '@/src/components/elements/modal';
import { CustomButton } from '@/src/components/elements/button';

import { styles } from '../styles/modals';

type CommentModalProps = {
  setShowCommentModal: () => void;
};

export const CommentModal = (props: CommentModalProps) => {
  const { setShowCommentModal } = props;

  return (
    <Modal onDismiss={setShowCommentModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Comment</Text>
        <View style={styles.commentBox}>
          <Text style={styles.username}>Jabulani Nkomo</Text>
          <Text style={styles.commentText}>Amazing work, I'll be needing this</Text>
          <View style={styles.actions}>
            <Ionicons name="happy-outline" size={20} color="black" />
            <FontAwesome6 name="keyboard" size={21} color="black" />
          </View>
        </View>
        <CustomButton customStyle={{ width: '100%' }} color="primaryBlue" onPress={() => null}>
          <Text style={styles.postBtnText}>POST</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
