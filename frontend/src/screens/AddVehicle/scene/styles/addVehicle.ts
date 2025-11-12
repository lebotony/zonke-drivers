import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...topOffset
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 20
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10
  },
  plusBtn: {
    backgroundColor: Colors.mrDBlue,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
  },
  imageWrapper: {
    width: "88%",
    aspectRatio: 16/12,
    borderRadius: 12,
  },
  imageStyles: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageText: {
    color: Colors.mediumGrey,
    fontSize: 20,
    position: 'absolute',
    top: "50%",
  },
  defaultImageStyles: {
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderStyle: "dashed",
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