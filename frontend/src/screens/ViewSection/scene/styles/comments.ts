import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  commentsSection: {
    flex: 1,
  },
  commentsTitle: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 10,
    color: Colors.veryDarkGrey,
  },
  addCommentRow: {
    backgroundColor: Colors.mrDBlue,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 16,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    flexDirection: "row",
    gap: 10,
  },
  addCommentText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    color: Colors.darkGrey,
  },
});
