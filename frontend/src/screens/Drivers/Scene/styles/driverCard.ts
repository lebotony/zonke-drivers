import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: "#888888",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderRadius: 10,
    marginHorizontal: 13,
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
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 3
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
    width: "75%",
    fontWeight: 400,
  },
  save: {
    position: "absolute",
    right: 10, top: 8
  },
  defaultPic: {
    backgroundColor: Colors.whiteSmoke,
    alignItems: "center",
    justifyContent: "center",
    width: 83,
    height: 83,
    borderRadius: 10,
  },
  cardBtns: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: Colors.lightGreen,
    width: "48%",
    ...shadowStyles,
  }
});
