import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  chatMessage: {
    backgroundColor: "#f2f2f2ff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    maxWidth: "75%",
    marginVertical: 2,
    marginHorizontal: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  chatMessageGrouped: {
    marginVertical: 1,
  },
  chatMessageAuthor: {
    backgroundColor: Colors.mrDBlue,
    borderBottomRightRadius: 4,
  },
  chatMessageReceived: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
  },
  messageMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "flex-end",
    gap: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.darkCharcoal,
  },
  messageTextAuthor: {
    color: Colors.white,
  },
  messageTime: {
    fontSize: 11,
    color: Colors.mediumGrey,
    opacity: 0.8,
  },
  messageTimeAuthor: {
    color: Colors.white,
    opacity: 0.85,
  },
});
