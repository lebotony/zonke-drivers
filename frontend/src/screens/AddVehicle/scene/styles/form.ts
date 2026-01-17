import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: 18,
    borderRadius: 16,
    gap: 14,
    ...shadowStyles,
    shadowOpacity: 0.06,
    elevation: 2,
  },
});
