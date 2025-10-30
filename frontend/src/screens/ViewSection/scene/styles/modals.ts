import { Colors } from '@/constants/ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    height: 290,
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: Colors.black,
    textAlign: 'center',
  },
  // COMMENT MODAL
  commentBox: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
    borderRadius: 8,
    flex: 1,
    marginBottom: 25,
  },
  comment: {
  flex: 1,
  justifyContent: 'space-between',
},
  commentInput: {
  height: '85%',
  fontSize: 15,
  textAlignVertical: 'top',
},


  username: {
    fontSize: 16,
    fontWeight: 700,
    color: Colors.dimGrey,
  },
  postBtnText: {
    color: Colors.white,
    fontWeight: 700,
  },
  commentText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.dimGrey,
    marginTop: 5,
  },
  // RATE MODAL
  starsWrapper: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  thanksText: {
    fontSize: 16,
    color: Colors.mediumDarkGrey,
    textAlign: 'center',
  },
  // SUCCESS MODAL
  boldText: {
    fontWeight: 700,
  },
});
