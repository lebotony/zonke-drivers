import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    ...shadowStyles,
    shadowOpacity: 0.06,
    elevation: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.lighterBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  contentWrapper: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mediumGrey,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 400,
    color: Colors.mediumLightGrey,
  },
  dropdownIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.skyLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  switchContainer: {
    marginLeft: 8,
  },
  dropdowmIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.whiteSmoke,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
