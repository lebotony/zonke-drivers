import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 20
  },
  header: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 20
  },
  imageWrapper: {
    height: 240,
    padding: 20,
    width: "80%",
    // marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.white,
    ...shadowStyles
  },
  addVehicleText: {
    fontSize: 16,
    fontWeight: 500,
    paddingHorizontal: 14,
  },
  addVehicleSubText: {
    fontSize: 14,
    fontWeight: 500,
    paddingHorizontal: 14,
    color: Colors.mediumGrey,
    marginBottom: 12
  },
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