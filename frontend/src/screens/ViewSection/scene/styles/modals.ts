import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 24,
  },
  title: {
    fontWeight: 800,
    fontSize: 24,
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  // COMMENT MODAL
  commentBox: {
    width: "100%",
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "rgba(118, 203, 237, 0.05)",
    borderColor: "rgba(118, 203, 237, 0.2)",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 22,
  },
  comment: {
    flex: 1,
    justifyContent: "space-between",
  },
  commentInput: {
    fontSize: 15,
    textAlignVertical: "top",
    color: Colors.darkCharcoalGrey,
    fontWeight: 500,
    lineHeight: 22,
  },

  username: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mrDBlue,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  postBtnText: {
    color: Colors.white,
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  commentText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.dimGrey,
    marginTop: 5,
  },
  // RATE MODAL
  starsWrapper: {
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  thanksText: {
    fontSize: 16,
    color: Colors.mediumDarkGrey,
    textAlign: "center",
  },
  // SUCCESS MODAL
  boldText: {
    fontWeight: 600,
  },
});
