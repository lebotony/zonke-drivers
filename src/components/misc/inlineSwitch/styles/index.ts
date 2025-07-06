import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 30,
    backgroundColor: Colors.bg,
    shadowColor: Colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  item: {
    borderRadius: 10,
    paddingHorizontal: 48,
    paddingVertical: 11,
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  label: {
    fontWeight: 500,
    fontSize: 14
  }
});
