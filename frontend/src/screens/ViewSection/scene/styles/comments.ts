import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  commentsSection: {
    flex: 1
  },
  commentsTitle: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 10,
    color: Colors.veryDarkGrey,
  },
  addCommentRow: {
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    margin: 12,
  },
  addCommentText: {
    color: Colors.mrDBlue,
    fontSize: 15,
  },
})