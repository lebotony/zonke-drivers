import { StyleSheet, Platform } from "react-native";

import { Colors } from "../../../../constants/ui";

export const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
      },
    }),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    outlineWidth: 0,
    flex: 1,
    fontSize: 15,
    color: Colors.darkCharcoalGrey,
    paddingVertical: 0,
    fontWeight: 500,
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
});
