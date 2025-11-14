import { StyleSheet } from "react-native";
import { Colors } from "../../../../../constants/ui";

export const styles = StyleSheet.create({
  root: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.mrDBlue,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
