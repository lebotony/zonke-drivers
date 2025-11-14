import { StyleSheet } from "react-native";

import { Colors } from "../../../../constants/ui";

export const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    flex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
    paddingVertical: 0,
  },
});
