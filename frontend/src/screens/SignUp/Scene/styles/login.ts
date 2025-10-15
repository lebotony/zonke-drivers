import { Colors } from '@/constants/ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 24,
    paddingTop: 15,
    position: 'relative',
  },
  goBack: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    shadowColor: Colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: Colors.whiteSmoke,
    position: 'absolute',
    top: 4,
    left: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 26,
    color: Colors.black,
    textAlign: 'center',
  },
  policy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  policyText: {
    fontSize: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.grey,
    fontSize: 13,
  },
  googleIcon: {
    marginRight: 4,
    width: 40,
    height: 40,
  },
  googleText: {
    fontSize: 17,
    color: Colors.black,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: Colors.mrDBlue,
    fontWeight: '500',
    marginLeft: 5,
  },
  copyright: {
    color: Colors.grey,
    fontSize: 12,
    marginTop: 18,
    textAlign: 'center',
  },
});
