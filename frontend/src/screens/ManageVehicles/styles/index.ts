import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset
  },
  header: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    textAlign: "center",
  },
});
