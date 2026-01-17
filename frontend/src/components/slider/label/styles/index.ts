import { StyleSheet } from "react-native";

import { Colors } from "../../../../../constants/ui";

export const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: Colors.mrDBlue,
    borderRadius: 6,
  },
  text: {
    fontSize: 12,
    color: "#fff",
    fontWeight: 600,
  },
});
