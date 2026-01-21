import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    // ...topOffset,
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
  switchContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  switchButtonActive: {
    backgroundColor: Colors.mrDBlue,
  },
  switchButtonText: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },
  switchButtonTextActive: {
    color: Colors.white,
    fontWeight: 600,
  },
});
