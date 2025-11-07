import { Colors } from '@/constants/ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  commentBox: {
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
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
    justifyContent: 'space-between',
  },
  commentAction: {
    color: Colors.dimGrey,
    fontSize: 14,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  replies: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 12,
  },

  replyToggle: {
    color: Colors.mrDBlue
  },
  replyList: {
    marginTop: 10,
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greyLighter,
  },
  replyItem: {
    paddingVertical: 6,
    paddingRight: 12,
  },
  replyName: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.veryDarkGrey,
  },
  replyText: {
    fontSize: 14,
    color: Colors.dimGrey,
    marginTop: 2,
  },
  smallText: {
    fontSize: 12,
    color: Colors.mediumGrey,
    fontWeight: 400,
  },
  replyBox: {
    marginTop: 10,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.greyLighter,
  },
  replyInput: {
    minHeight: 44,
    maxHeight: 120,
    padding: 8,
    borderRadius: 6,
    color: Colors.veryDarkGrey,
    fontSize: 14,
  },
  replyTitle: {
    fontWeight: 500
  },
  replySend: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.mrDBlue,
    width: 34,
    height: 34,
    borderRadius: '50%',
  },
  replySendText: {
    color: Colors.white,
    fontWeight: 600,
    fontSize: 14,
  },
});