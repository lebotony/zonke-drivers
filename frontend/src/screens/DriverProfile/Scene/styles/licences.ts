import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

const VERTIAL_MARGIN = 10;

export const styles = StyleSheet.create({
  pill: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 4,
    ...shadowStyles
  },
  heading: {
    fontSize: 15.5,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 8,
    fontStyle: "italic",
  },
  location: {
    color: Colors.black,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: VERTIAL_MARGIN
  }
})