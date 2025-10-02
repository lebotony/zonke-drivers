import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  commentsSection: {
    maxHeight: "50%",
    paddingHorizontal: 20,
    paddingTop: 4,
    borderTopColor: Colors.greyLighter,
    borderTopWidth: 1,
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
    marginBottom: 12,
  },
  addCommentText: {
    color: Colors.indigoBlue,
    fontSize: 15,
  },
})