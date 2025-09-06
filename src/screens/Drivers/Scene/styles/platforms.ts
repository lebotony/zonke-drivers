import { shadowStyles } from "@components/shadowStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  platformTags: {
    gap: 5,
    flexDirection: "row",
    flex: 1
  },
  platform: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    justifyContent: "center",
    borderRadius: 7,
    ...shadowStyles,
    shadowOpacity: 0.3
  },
  justIconPlatform: {
    width: 35,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  }
});
