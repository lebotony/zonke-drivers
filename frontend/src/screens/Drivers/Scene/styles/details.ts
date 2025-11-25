import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
    lineHeight: 19,
  },
  age: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.mediumGrey,
    position: "absolute",
    top: 0,
  },
  details: {
    marginLeft: 4,
    justifyContent: "space-evenly",
    gap: 2,
    flex: 1,
  },
  detailIcon: {
    width: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  ratingRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 700,
    textAlignVertical: "center",
    color: "rgba(0, 0, 0, 0.69)",
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    width: "75%",
    fontWeight: 400,
  },
});
