import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: Colors.bg,
    paddingHorizontal: 12,
  },
  messageItemUnread: {
    backgroundColor: Colors.verylightBlue,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: Colors.skyLight,
  },
  avatarStatus: {
    position: "absolute",
    bottom: 2,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  messageContent: {
    flex: 1,
  },
  messageNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageName: {
    fontSize: 15,
    fontWeight: 700,
    color: Colors.darkBlue,
  },
  messageTime: {
    fontSize: 13,
    color: Colors.darkCharcoal,
    fontWeight: "500",
  },
  messageTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageText: {
    fontSize: 14,
    color: Colors.slateGray,
    marginTop: 2,
    maxWidth: "90%",
  },
  unreadBadge: {
    backgroundColor: "#4CAF50",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadBadgeText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
});
