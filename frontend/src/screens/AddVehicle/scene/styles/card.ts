import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 13,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    ...shadowStyles
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5F0",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  dropdowmIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.whiteSmoke,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})