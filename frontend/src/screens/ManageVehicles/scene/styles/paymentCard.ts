import { StyleSheet } from "react-native";

import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    height: 60,
    borderRadius: 7,
    position: "relative",
    marginBottom: 12,
    ...shadowStyles
  },
  addText: {
    color: Colors.skyBlue
  },
  header: {
    paddingVertical: 4,
    marginLeft: 20,
    marginRight: 15,
    borderStyle: "dashed",
    borderBottomWidth: 1,
    borderColor: Colors.greyLighter,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  body: {
    marginLeft: 20,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountText: {
    color: Colors.lightGreen,
    fontSize: 15,
    fontWeight: 700
  },
  headerName: {
    color: Colors.black,
    fontWeight: 600,
    fontSize: 15,
  },
  time: {
    flexDirection: "row",
    gap: 5
  },
  timeText: {
    color: Colors.mediumGrey
  },
  leftBadge: {
    position: "absolute",
    left: 0,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    width: 10,
    height: 60,
    backgroundColor: Colors.lightGreen,
    marginRight: 10
  }
});
