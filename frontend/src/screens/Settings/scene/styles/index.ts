import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset
  },
  header: {
    fontSize: 22,
  },
  avatarWrapper: {
    position: "relative",
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderStyle: "dashed",
    justifyContent: 'center',
    borderRadius: "50%"
  },
  addText: {
    fontSize: 13,
    position: 'absolute',
    color: Colors.mediumGrey,
    alignItems: 'center',
    left: 16
  },
  userWrapper: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 7,
  },
  infowrapper: {
  },
  userText: {
    fontSize: 18,
    marginLeft: 20,
  },
  descriptionText: {
    fontSize: 15,
    marginLeft: 20,
    color: Colors.mediumGrey
  },
  forwardArrow: {
    color: Colors.lightGrey,
    position: 'absolute',
    right: 15
  },
  body: {
    marginTop: 35,
    backgroundColor: Colors.white,
    borderTopColor: Colors.whiteSmoke,
    borderTopWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
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
  }
})