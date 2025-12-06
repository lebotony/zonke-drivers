import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset,
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
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
    aspectRatio: 16 / 12,
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
    position: "absolute",
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
    marginBottom: 8,
  },
  driverContainer: {
    marginBottom: 14,
  },
  profileWrapper: {
    flexDirection: "row",
    gap: 14,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  profileName: {
    fontSize: 15,
  },
  age: {
    fontSize: 12,
  },
  addNewBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
  },
  addNewText: {
    color: Colors.white,
  },

  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 13,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...shadowStyles,
  },
  driverImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dropdowmIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.whiteSmoke,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nbActivate: {
    marginLeft: 17,
    color: Colors.lightRed
  },
  btnStyles: {
    flexGrow: 1,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 10
  },
});
