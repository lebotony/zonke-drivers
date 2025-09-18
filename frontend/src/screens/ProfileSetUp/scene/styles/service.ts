import { StyleSheet } from 'react-native';

import { Colors } from '../../../../../constants/ui';

export const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lighterBlue,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    height: 44,
  },
  resultText: {
    fontSize: 16,
    color: Colors.black,
  },
  checkedBox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
