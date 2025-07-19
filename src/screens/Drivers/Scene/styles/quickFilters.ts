import { StyleSheet } from "react-native";

import { Colors } from "@constants/ui";

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    gap: 10
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heading: {
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 15,
    paddingVertical: 4
  },
  clearButton: {
    paddingVertical: 0
  },
  platformFilter: {
    backgroundColor: Colors.white,
    shadowColor: Colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    paddingBottom: 11,
    borderBottomColor: Colors.skyLight,
    borderBottomWidth: 1,
    padding: 10,
    gap: 8,
    minWidth: "100%"
  },
  platform: {},
  platformText: {
    color: Colors.white
  },
  filterIcon: {
    marginRight: 3
  }
});
