import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  brands: {
    gap: 6,
    paddingBottom: 5
  },
  chip: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 29,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
  }
})