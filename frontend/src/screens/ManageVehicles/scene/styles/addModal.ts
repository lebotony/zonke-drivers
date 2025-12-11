import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  addModal: {
    flexDirection: "row",
    gap: 18,
  },
  addInput: {
    borderWidth: 1,
    width: 180,
    borderColor: Colors.lighterGrey,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    paddingLeft: 12,
  },
  amountText: {
    color: Colors.black,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    outlineWidth: 0,
    color: Colors.black,
    fontSize: 16,
    paddingRight: 12,
    width: 40,
  },
});
