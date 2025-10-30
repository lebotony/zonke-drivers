import { View, Text, TextInput, Keyboard, Platform } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

import { Colors } from '@/constants/ui';
import { Modal } from '@/src/components/modal';
import { CustomButton } from '@/src/components/elements/button';
import { styles } from '../styles/modals';

type CommentModalProps = {
  setShowCommentModal: () => void;
};

export const CommentModal = ({ setShowCommentModal }: CommentModalProps) => {
  const [comment, setComment] = useState('');
  const [commentHeight, setCommentHeight] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardOpen(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardOpen(false)
        inputRef.current?.blur()
      }  
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  const handleKeyboardIcon = () => {
    if (!keyboardOpen) {
      inputRef.current?.focus();
    }  
  };

  return (
    <Modal onDismiss={setShowCommentModal}>
      <View style={[styles.container, { height: commentHeight + 250 }]}>
        <Text style={styles.title}>Add Comment</Text>

        <View style={[styles.commentBox ]}>
          <Text style={styles.username}>Jabulani Nkomo</Text>

          <View style={[styles.comment]}>
            <TextInput
              ref={inputRef}
              style={[styles.commentInput, {height: '85%'}]}
              placeholder="Write your comment..."
              placeholderTextColor="#999"
              value={comment}
              onChangeText={setComment}
              multiline
              onContentSizeChange={(event) =>
                setCommentHeight(event.nativeEvent.contentSize.height)
              }
            />
            <View>
              <FontAwesome6
                name="keyboard"
                size={21}
                color={Colors.mediumGrey}
                onPress={handleKeyboardIcon}
              />
            </View>
          </View>
        </View>

        <CustomButton
          customStyle={{ width: '100%' }}
          color="primaryBlue"
          onPress={() => {
            console.log('Posting comment:', comment);
            setShowCommentModal();
          }}
        >
          <Text style={styles.postBtnText}>POST</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
