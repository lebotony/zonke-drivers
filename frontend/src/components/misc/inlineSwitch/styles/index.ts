import { Colors } from "../../../../../constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
  },
  switch: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 15,
    flex: 1,
    backgroundColor: Colors.bg,
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
