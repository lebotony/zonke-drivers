import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 13,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    ...shadowStyles
  },
})