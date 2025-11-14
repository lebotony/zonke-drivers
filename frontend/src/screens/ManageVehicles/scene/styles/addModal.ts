import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  addModal: {
    flexDirection: "row",
    gap: 18,
  },
  addInput: {
    borderWidth: 1,
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
  },
  textInput: {
    lineHeight: 20,
    color: Colors.black,
    fontSize: 14,
    paddingRight: 12,
  },
});
