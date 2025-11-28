import { StyleSheet, Dimensions } from "react-native";

import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";

const screenWidth = Dimensions.get("window").width;
const dynamicWidth = screenWidth - screenWidth * 0.4 - 85;

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 13,
    marginHorizontal: 14,
    marginBottom: 20,
    borderRadius: 7,
    backgroundColor: Colors.white,
    position: "relative",
    ...shadowStyles,
  },
  body: {
    paddingVertical: 10,
    paddingBottom: 8,
    flexDirection: "row",
    gap: 13,
  },
  image: {
    width: "40%",
    aspectRatio: 1.25,
    backgroundColor: Colors.verylightBlue,
    borderRadius: 7,
    ...shadowStyles,
  },
  imagePlaceholder: {
    width: "40%",
    aspectRatio: 1.25,
    backgroundColor: Colors.lighterGrey,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
  },
  optionsBtn: {
    width: 35,
    height: 35,
    backgroundColor: Colors.whiteSmoke,
    borderRadius: "50%",
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    // ...shadowStyles
  },
  payments: {
    paddingTop: 10,
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentCard: {
    width: "48%",
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: Colors.bg,
    ...shadowStyles,
  },
  paymentText: {
    color: Colors.lightGreen,
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
  },
  amountText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 15,
  },
  dateText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    color: Colors.mediumLightGrey,
  },
  recentPaidWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    lineHeight: 20,
    width: dynamicWidth,
  },
  btnStyles: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: Colors.mrDBlue,
    marginVertical: 10,
    ...shadowStyles,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 17,
    color: Colors.white,
  },
  age: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.mediumGrey,
    position: "absolute",
    top: 0,
  },
  details: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  detailIcon: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentCountText: {
    marginLeft: 2,
    color: Colors.mediumGrey,
    fontSize: 11,
    maxWidth: "85%",
    fontWeight: 400,
  },
  detailText: {
    marginLeft: 2,
    color: Colors.mediumGrey,
    fontSize: 13,
    maxWidth: "85%",
    fontWeight: 400,
  },
  unreadBadge: {
    backgroundColor: Colors.lightRed,
    minWidth: 18,
    height: 18,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    position: "absolute",
    elevation: 4,
    top: 5,
    right: -3,
  },
  unreadBadgeText: {
    color: Colors.white,
    fontSize: 10,
  },
});
