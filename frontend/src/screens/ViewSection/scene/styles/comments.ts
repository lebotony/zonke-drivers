import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  commentsSection: {
    flex: 1,
    marginTop: 8,
  },
  commentsTitle: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 10,
    color: Colors.veryDarkGrey,
  },
  addCommentRow: {
    borderWidth: 0.6,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 14,
    marginBottom: 12,
  },
  addCommentText: {
    color: Colors.mrDBlue,
    fontSize: 15,
  },
});
