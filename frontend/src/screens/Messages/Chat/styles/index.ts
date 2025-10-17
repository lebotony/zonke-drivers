import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    backgroundColor: Colors.white,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 15,
    backgroundColor: Colors.lightGrey,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkBlue,
  },
  status: {
    fontSize: 13,
    color: Colors.darkBlue,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  dateDivider: {
    alignSelf: 'center',
    paddingVertical: 4,
    color: Colors.grayishRed,
    fontSize: 13,
  },
});
