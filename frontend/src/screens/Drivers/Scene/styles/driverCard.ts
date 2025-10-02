import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 14,
    shadowColor: "#888888",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
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
    position: 'absolute',
    top: 0
  },
  details: {
    marginLeft: 4,
    justifyContent: "space-evenly",
    gap: 2,
  },
  detailIcon: {
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 3
  },
  ratingRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 700,
    textAlignVertical: "center",
    color: "rgba(0, 0, 0, 0.69)"
  },
  ratingCreteria: {
    width: 120,
    fontSize: 11,
    fontWeight: 400,
    color: Colors.mediumGrey,
    textAlignVertical: "center",
    position: 'absolute',
    top: 2.1,
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    maxWidth: "85%",
    fontWeight: 400
  },
  save: { position: "absolute", right: 10, top: 8 }
});
