import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
    marginBottom: 12,
    marginHorizontal: 15,
    shadowColor: Colors.mediumDarkGrey,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: Colors.whatsAppGreen,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
