import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
      },
    }),
  },
  messageItemUnread: {
    backgroundColor: Colors.skyLight,
    borderLeftWidth: 3,
    borderLeftColor: Colors.mrDBlue,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: Colors.lightGrey,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  avatarStatus: {
    position: "absolute",
    bottom: 0,
    right: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: Colors.white,
  },
  messageContent: {
    flex: 1,
    paddingRight: 4,
  },
  messageNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.2,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.mediumGrey,
    fontWeight: 500,
    marginLeft: 8,
  },
  messageTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  messageText: {
    fontSize: 14,
    color: Colors.slateGray,
    lineHeight: 20,
    flex: 1,
  },
  messageTextUnread: {
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  unreadBadge: {
    backgroundColor: Colors.mrDBlue,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    marginLeft: 4,
  },
  unreadBadgeText: {
    color: Colors.white,
    fontWeight: 600,
    fontSize: 11,
  },
  checkIcon: {
    marginLeft: 4,
  },
});
