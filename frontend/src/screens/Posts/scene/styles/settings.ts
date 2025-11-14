import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  servicePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dimGrey,
    marginTop: 9,
  },
  resultItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lighterBlue,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    height: 48,
  },
  resultText: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
  },
  checkedBox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
