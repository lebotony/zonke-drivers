import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

const SHADOWS_SOFT = {
  shadowColor: Colors.darkCharcoalGrey,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS_SOFT,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  pillModern: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.mrDBlue + "15",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.mrDBlue + "30",
  },
  pillText: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mrDBlue,
  },
  // Legacy styles
  pill: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
    ...shadowStyles,
  },
  location: {
    color: Colors.black,
    fontSize: 14,
  },
});
