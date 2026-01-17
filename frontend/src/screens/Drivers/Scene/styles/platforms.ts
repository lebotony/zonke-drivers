import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  platformTags: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  platform: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  justIconPlatform: {
    width: 36,
    height: 36,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
