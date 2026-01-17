import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  inputContainerFocused: {
    borderColor: Colors.mrDBlue,
    backgroundColor: Colors.white,
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
    color: Colors.mediumGrey,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.darkCharcoalGrey,
    backgroundColor: "transparent",
  },
  forgotPasswordWrapper: {
    position: "absolute",
    right: 0,
  },
  forgotPassword: {
    color: Colors.mrDBlue,
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  loginFieldsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  signupNote: {
    fontSize: 13,
    color: Colors.mediumGrey,
    marginBottom: 12,
    fontWeight: 500,
  },
  signupNoteHighlight: {
    color: Colors.mrDBlue,
    fontWeight: 600,
  },
});
