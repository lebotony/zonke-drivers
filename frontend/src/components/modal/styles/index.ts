import { StyleSheet } from "react-native";

import { Colors } from "../../../../constants/ui";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100000,
    elevation: 10000,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    backgroundColor: Colors.white,
    maxHeight: "92%",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
