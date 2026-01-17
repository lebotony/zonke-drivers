import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

const SPACING = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    position: "relative",
    ...topOffset,
  },

  contentContainer: {
    flex: 1,
  },

  // Header Section
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: 0,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.3,
  },

  commentCountBadge: {
    backgroundColor: Colors.mrDBlue + "15",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm - 2,
    borderRadius: 12,
    minWidth: 32,
    alignItems: "center",
  },

  commentCountText: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.mrDBlue,
  },

  // List Content
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxxl,
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xxxl,
  },

  emptyStateIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.mrDBlue + "10",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xxl,
  },

  emptyStateEmoji: {
    fontSize: 48,
  },

  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },

  emptyStateSubtitle: {
    fontSize: 15,
    fontWeight: 400,
    color: Colors.mediumGrey,
    textAlign: "center",
    lineHeight: 22,
  },

  // Legacy styles (kept for backward compatibility)
  addCommentRow: {
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    margin: 12,
  },
  addCommentText: {
    color: Colors.mrDBlue,
    fontSize: 15,
  },
});
