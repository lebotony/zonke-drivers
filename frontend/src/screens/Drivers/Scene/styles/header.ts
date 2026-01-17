import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    paddingBottom: 16,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingRight: 16,
    gap: 12,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 44,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1.5,
    borderColor: "rgba(118, 203, 237, 0.25)",
    shadowColor: "rgba(118, 203, 237, 0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(118, 203, 237, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    outlineWidth: 0,
    flex: 1,
    fontSize: 15,
    color: Colors.darkCharcoalGrey,
    height: 44,
    paddingVertical: 0,
    fontWeight: 500,
  },
  filterButton: {
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  filterButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    marginLeft: -30,
  },
});
