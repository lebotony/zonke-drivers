import { StyleSheet, Platform } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

const IS_ANDROID = Platform.OS === "android";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

const SHADOWS_SOFT = {
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: IS_ANDROID ? 0.02 : 0.04,
  shadowRadius: IS_ANDROID ? 2 : 4,
  elevation: IS_ANDROID ? 1 : 2,
};

export const styles = StyleSheet.create({
  selectText: {
    color: Colors.mrDBlue,
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 0.2,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    backgroundColor: Colors.mrDBlue + "10",
    borderRadius: 20,
    overflow: "hidden",
  },
  selected: {
    minHeight: 56,
    flexWrap: "wrap",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderColor: Colors.lightGrey + "80",
    borderRadius: 12,
    borderWidth: 1,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mrDBlue + "15",
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderColor: Colors.mrDBlue + "30",
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mrDBlue,
    marginRight: SPACING.xs,
    letterSpacing: 0.1,
  },
  platformButton: {
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    ...SHADOWS_SOFT,
  },
  platformText: {
    color: Colors.white,
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  closeIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightRed + "30",
    ...SHADOWS_SOFT,
  },
  emptyText: {
    color: Colors.mediumGrey,
    fontSize: 14,
    fontStyle: "italic",
    marginLeft: SPACING.xs,
  },
});
