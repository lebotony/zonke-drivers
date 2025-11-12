import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
    textAlign: "center",
  },
});
