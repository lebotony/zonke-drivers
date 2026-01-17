import { Colors } from "@/constants/ui";
import { StyleSheet, Platform } from "react-native";

const IS_ANDROID = Platform.OS === "android";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

const SHADOWS = {
  subtle: {
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: IS_ANDROID ? 0.03 : 0.06,
    shadowRadius: IS_ANDROID ? 3 : 6,
    elevation: IS_ANDROID ? 1 : 2,
  },
};

export const styles = StyleSheet.create({
  // Modern Comment Card
  commentCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.subtle,
  },

  // Avatar Section
  avatarContainer: {
    marginRight: SPACING.md,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.mrDBlue + "15",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.mrDBlue + "20",
  },

  avatarText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.mrDBlue,
    letterSpacing: 0.5,
  },

  // Content Section
  commentContent: {
    flex: 1,
  },

  commentHeader: {
    marginBottom: SPACING.sm,
  },

  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  authorName: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.2,
  },

  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.mediumGrey,
  },

  timestamp: {
    fontSize: 13,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },

  commentText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.mediumDarkGrey,
    fontWeight: 400,
    letterSpacing: 0.1,
  },

  // Legacy styles (kept for backward compatibility - reply functionality)
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
  commentAction: {
    color: Colors.dimGrey,
    fontSize: 14,
  },
  actionIcons: {
    flexDirection: "row",
    gap: 15,
  },
  replies: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewText: {
    fontSize: 12,
  },
  replyToggle: {
    color: Colors.mrDBlue,
  },
  replyList: {
    marginTop: 10,
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greyLighter,
  },
  replyItem: {
    paddingVertical: 6,
    paddingRight: 12,
  },
  replyName: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.veryDarkGrey,
  },
  replyText: {
    fontSize: 14,
    color: Colors.dimGrey,
    marginTop: 2,
  },
  smallText: {
    fontSize: 12,
    color: Colors.mediumGrey,
    fontWeight: 400,
  },
  replyBox: {
    marginTop: 10,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.greyLighter,
  },
  replyInput: {
    minHeight: 44,
    maxHeight: 120,
    padding: 8,
    borderRadius: 6,
    color: Colors.veryDarkGrey,
    fontSize: 14,
  },
  replyTitle: {
    fontWeight: 500,
  },
  replySend: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.mrDBlue,
    width: 34,
    height: 34,
    borderRadius: "50%",
  },
  replySendText: {
    color: Colors.white,
    fontWeight: 600,
    fontSize: 14,
  },
});
