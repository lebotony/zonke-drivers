import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset,
  },
  header: {
    color: Colors.darkCharcoalGrey,
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 4,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  subtitle: {
    color: Colors.mediumGrey,
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});
