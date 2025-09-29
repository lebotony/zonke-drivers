import { Colors } from '@/constants/ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 6,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.grey,
    backgroundColor: Colors.bg,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.bg,
  },
  forgotPasswordWrapper: {
    position: 'absolute',
    right: 0,
  },
  forgotPassword: {
    color: Colors.primaryBlue,
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
});
