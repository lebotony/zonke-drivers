import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  brands: {
    gap: 6,
    paddingBottom: 5,
    paddingTop: 5,
  },
  chip: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  logoShadowContainer: {
    borderRadius: 25,
    ...shadowStyles,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chipText: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginTop: 4,
  },
});
