import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  platformFilter: {
    marginTop: 10,
    paddingHorizontal: 7,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  platformButton: {
    borderRadius: 5,
    paddingVertical: 5,
    ...shadowStyles,
    shadowOpacity: 0.4,
  },
  platformText: {
    color: Colors.white
  },
});
