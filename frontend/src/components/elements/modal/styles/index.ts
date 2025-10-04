import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
  },
  modalWrapper: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    backgroundColor: Colors.white,
  },
  centerModal: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 15
  }
});
