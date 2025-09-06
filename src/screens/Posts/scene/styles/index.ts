import { StyleSheet } from 'react-native';

import { Colors } from '@constants/ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 30,
  },
  backBtn: {
    position: 'absolute',
    top: 6,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginVertical: 15,
  },
});
