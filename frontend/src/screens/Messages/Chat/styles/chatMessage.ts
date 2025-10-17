import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  chatMessage: {
    backgroundColor: '#f7f7f7ff',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    maxWidth: '80%',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  messageMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    justifyContent: 'flex-end',
    gap: 5
  },
  messageText: {
    fontSize: 15,
    color: Colors.dimGrey,
  },
  messageTime: {
    fontSize: 13,
    color: Colors.mediumGrey,
  },
});
