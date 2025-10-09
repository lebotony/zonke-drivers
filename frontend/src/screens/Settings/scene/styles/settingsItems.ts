import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: Colors.white,
    borderTopColor: Colors.whiteSmoke,
    borderTopWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    paddingLeft: 15,
  },
  itemLabelWrapper: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 17,
    height: "100%",
  },
  itemLabelText: {
    fontSize: 17,
  },
  iconWrapper: {
    borderRadius: 7,
    width: 35,
    height: 35,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forwardArrow: {
    color: Colors.lightGrey,
    position: 'absolute',
    right: 15
  },
})