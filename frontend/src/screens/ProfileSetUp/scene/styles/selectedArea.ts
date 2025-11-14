import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  selectText: {
    color: Colors.mrDBlue,
    fontWeight: 700,
    fontSize: 16,
    textDecorationLine: "underline",
    marginRight: 3,
  },
  selected: {
    minHeight: 40,
    flexWrap: "wrap",
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.skyBlue,
    borderRadius: 50,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 24,
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    marginBottom: 5,
  },
  selectedText: {
    fontSize: 13,
    color: Colors.black,
    marginRight: 4,
  },
  platformButton: {
    borderRadius: 5,
    paddingVertical: 5,
    ...shadowStyles,
    shadowOpacity: 0.4,
    marginRight: 10,
    marginBottom: 8,
  },
  platformText: {
    color: Colors.white,
  },
  closeIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.whiteSmoke,
    justifyContent: "center",
    alignItems: "center",
  },
});
