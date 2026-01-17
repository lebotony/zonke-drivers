import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    minHeight: 48,
  },
  input: {
    outlineWidth: 0,
    flex: 1,
    fontSize: 16,
    color: Colors.darkCharcoalGrey,
    paddingHorizontal: 8,
    paddingVertical: 8,
    maxHeight: 100,
    lineHeight: 20,
  },
  sendButton: {
    backgroundColor: Colors.mrDBlue,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
