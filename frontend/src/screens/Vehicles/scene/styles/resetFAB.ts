import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: Colors.lightRed,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  fabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fabText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 600,
  },
});
