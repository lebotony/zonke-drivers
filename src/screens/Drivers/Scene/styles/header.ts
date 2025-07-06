import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
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
    paddingTop: 10,
    borderBottomColor: Colors.skyLight,
    borderBottomWidth: 1
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    gap: 10
  },
  inputWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    flex: 1,
    height: 34,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    height: 34,
    paddingVertical: 0
  }
});
