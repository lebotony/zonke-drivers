import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    maxWidth: 400,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: Colors.darkCharcoalGrey,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGrey,
    fontWeight: 500,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mediumGrey,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  inputContainer: {
    backgroundColor: Colors.bg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.greyLighter,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: Colors.mrDBlue,
    backgroundColor: Colors.white,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  currencyContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.greyLighter,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  textInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: 800,
    color: Colors.darkCharcoalGrey,
    padding: 0,
    outlineWidth: 0,
    letterSpacing: -0.5,
  },
  helperText: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginTop: 8,
    fontWeight: 500,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.lightGreen,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.lightGreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.greyLighter,
    backgroundColor: Colors.white,
  },
  cancelButtonText: {
    color: Colors.mediumGrey,
    fontSize: 15,
    fontWeight: 600,
  },
});
