import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  messageText: {
    color: Colors.black,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: "row",
  },
  textInput: {
    height: 40,
    color: Colors.black,
    fontSize: 14,
    paddingRight: 12,
  },
});
