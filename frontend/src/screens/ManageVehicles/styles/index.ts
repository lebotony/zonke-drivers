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
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 16,
    textAlign: "center",
  },
});
