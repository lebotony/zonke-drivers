import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  commentsSection: {
    flex: 1,
    paddingBottom: 20,
    position: "relative",
    ...topOffset,
  },
  commentsTitle: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 15,
    color: Colors.veryDarkGrey,
    margin: "auto",
  },
  noCommentsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCommentsText: {
    color: Colors.veryDarkGrey,
    fontSize: 20,
    fontWeight: 600,
  },
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
