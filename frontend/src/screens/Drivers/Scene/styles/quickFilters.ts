import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 14,
    fontWeight: 600,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
  },
  platformFilter: {
    marginTop: 7,
    paddingHorizontal: 7,
    gap: 8,
    minWidth: "100%",
    ...shadowStyles,
  },
  platformButton: {
    borderRadius: 5,
    paddingVertical: 5,
    ...shadowStyles,
    shadowOpacity: 0.4,
  },
  platformText: {
    color: Colors.white
  },
  filterIcon: {
    marginRight: 3
  }
});
