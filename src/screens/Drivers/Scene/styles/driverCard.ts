import { StyleSheet } from "react-native";

import { Colors } from "@constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    // shadowColor: Colors.darkGrey,
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowOpacity: 0.19,
    // shadowRadius: 5.62,
    // elevation: 6,
    // paddingBottom: 11,
    // paddingTop: 10,
    // borderBottomColor: Colors.skyLight,

    shadowColor: "#888888",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderRadius: 25,
    // borderColor: Colors.lightGrey,
    // borderWidth: 1,
    // height: 150,
    padding: 12,
    gap: 10
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.69)"
  },
  age: {
    fontWeight: "400",
    fontSize: 16,
    color: Colors.mediumGrey
  },
  details: {
    justifyContent: "space-evenly"
  },
  ratingRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 500,
    textAlignVertical: "center",
    color: "rgba(0, 0, 0, 0.69)"
  },
  ratingCreteria: {
    fontSize: 13,
    color: Colors.mediumGrey,
    textAlignVertical: "center"
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 15,
    maxWidth: "85%"
  },
  save: { position: "absolute", right: 5 }
});
