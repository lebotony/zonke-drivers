import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';

import { styles } from '../styles/comment';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/ui';
import { CustomButton } from '@/src/components/elements/button';

type CommentProps = {
  comment?: CommentType;
};

export const Comment = (props: CommentProps) => {
  const { comment } = props;

  // dummy replies
  const initialReplies =  [
    { id: 'r1', name: 'Alex', date: '2d', text: 'Looks great!' },
    { id: 'r2', name: 'Sam', date: '1d', text: 'How long did it take?' },
  ];

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState(initialReplies);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const addReply = () => {
    if (!replyText.trim()) return;
    const newReply = {
      id: `${Date.now()}`,
      name: 'You',
      date: 'now',
      text: replyText.trim(),
    };

    setReplies((p) => [newReply, ...p]);
    setReplying(false);
    setReplyText('');
  };

  const renderReply = ({ item }: any) => (
    <View style={styles.replyItem}>
      <Text style={styles.replyName}>{item.name} <Text style={styles.smallText}>· {item.date}</Text></Text>
      <Text style={styles.replyText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.commentBox}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentName}>Lebohang Mdlongwa</Text>
        <Text style={styles.commentDate}>27 Oct</Text>
      </View>
      <Text style={styles.commentText}>He does a great job</Text>

            <View style={styles.commentActions}>
        <TouchableOpacity onPress={() => {setShowReplies((s) => !s), setReplying(false)}} style={styles.replies}>
          <MaterialIcons name={showReplies ? "keyboard-arrow-down" : "keyboard-arrow-left"} size={18} color={showReplies ? Colors.mrDBlue : Colors.charcoalGray} />
          <Text style={[styles.viewText, showReplies && styles.replyToggle]}>
            {showReplies ? `Hide replies (${replies.length})` : `View replies (${replies.length})`}
          </Text>
        </TouchableOpacity>

        <View style={styles.actionIcons}>

          <TouchableOpacity onPress={() => setReplying(!replying)}>
            <Text style={styles.commentAction}>💬 Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
     

      {showReplies && (
        <View style={styles.replyList}>
          <FlatList
            data={replies}
            keyExtractor={(item) => item.id}
            renderItem={renderReply}
            scrollEnabled={false}
          />
          
        </View>
      )}

      {replying && (
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
      )}
    </View>
  );
};