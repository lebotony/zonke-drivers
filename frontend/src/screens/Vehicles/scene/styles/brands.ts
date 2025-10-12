import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  brands: {
    marginTop: 2,
    gap: 6,
    justifyContent: "space-between",
  },
  brandsFlatlist: {
    height: 150,
    marginLeft: 14,
  },
  chip: {
    height: 90,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
    gap: 4,
  },
  brandLogo: {
    width: 58,
    height: 58,
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