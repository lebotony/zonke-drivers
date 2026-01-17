import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  outerWrapper: {
    overflow: "hidden",
    paddingBottom: 16,
    marginBottom: -16,
  },
  gradientBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 1,
  },
  iosWrapper: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 1,
  },
  container: {
    paddingVertical: 8,
    backgroundColor: Colors.white,
    paddingTop: 12,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  heading: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.2,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(118, 203, 237, 0.15)",
    borderRadius: 8,
  },
  platformFilter: {
    marginTop: 12,
    paddingHorizontal: 16,
    gap: 10,
    minWidth: "100%",
  },
  platformButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  platformText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 600,
  },
  filterIcon: {
    marginRight: 3,
  },
});
