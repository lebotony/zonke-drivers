import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  commentBox: {
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentName: {
    fontWeight: 700,
    color: Colors.veryDarkGrey,
    fontSize: 15,
  },
  commentDate: {
    color: Colors.mediumGrey,
    fontSize: 13,
  },
  commentText: {
    color: Colors.dimGrey,
    fontSize: 15,
    marginBottom: 6,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  commentAction: {
    color: Colors.dimGrey,
    fontSize: 14,
  },
});
