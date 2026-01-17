import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 15,
    position: "relative",
  },
  goBack: {
    height: 44,
    width: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: Colors.white,
    position: "absolute",
    top: 8,
    left: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
    transform: [{ translateX: -42 }],
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 8,
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.mediumGrey,
    textAlign: "center",
    lineHeight: 22,
  },
  switch: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
    backgroundColor: Colors.bg,
    padding: 4,
    borderRadius: 12,
  },
  switchBtns: {
    borderRadius: 10,
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  activeSwitchBtn: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  switchText: {
    color: Colors.mediumGrey,
    fontSize: 15,
    fontWeight: 500,
  },
  activeSwitchText: {
    color: Colors.darkCharcoalGrey,
    fontWeight: 600,
  },
  policy: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  policyText: {
    fontSize: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  dividerText: {
    marginHorizontal: 12,
    color: Colors.mediumGrey,
    fontSize: 14,
  },
  googleIcon: {
    marginRight: 4,
    width: 40,
    height: 40,
  },
  googleText: {
    fontSize: 17,
    color: Colors.black,
    fontWeight: 600,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 4,
  },
  signupText: {
    color: Colors.mrDBlue,
    fontWeight: 600,
  },
  signupPrompt: {
    color: Colors.mediumGrey,
    fontWeight: 500,
  },
  copyright: {
    color: Colors.mediumGrey,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
});
