import { StyleSheet } from "react-native";

import { Colors } from "../../../../constants/ui";
import { shadowStyles } from "../../shadowStyles";

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderRadius: 5,
    position: "relative",
    // zIndex: 1,
    overflow: "hidden",
  },
  before: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
    opacity: 0.4,
    zIndex: -1,
  },
  inputText: {
    fontSize: 15,
    color: Colors.black,
  },
  placeholderText: {
    opacity: 0.3,
  },
  caretWrapper: {
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 4999,
  },
  dropdownMenu: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 8,
    zIndex: 5000,
    ...shadowStyles,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    width: "auto",
  },
  longText: {
    position: "absolute",
    opacity: 0,
  },
});
