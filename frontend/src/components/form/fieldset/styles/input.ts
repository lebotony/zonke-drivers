import { Colors } from '../../../../../constants/ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,

    marginBottom: 6,
    marginLeft: 2,
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    // height: 44,
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.grey,
    backgroundColor: Colors.whiteSmoke,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.whiteSmoke,
  },
  textArea: {
    minHeight: 65,
    textAlignVertical: 'top',
    includeFontPadding: false,
    paddingTop: 0,
  },
});
