import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    flex: 1
  },
  headerText: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    paddingTop: 28,
  },
  addText: {
    color: Colors.mrDBlue,
    fontSize: 19,
    fontWeight: 600,
  },
});
