import { Colors } from "../../../../../constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  switch: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 30,
    backgroundColor: Colors.bg,
    shadowColor: Colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 2,
  },
  item: {
    borderRadius: 10,
    paddingVertical: 11,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  label: {
    fontWeight: 500,
    fontSize: 14,
  },
  hideTopShadow: {
    position: "absolute",
    backgroundColor: Colors.bg,
    zIndex: 10,
    left: 0,
    right: 0,
    top: -6,
    height: 6,
  },
});
