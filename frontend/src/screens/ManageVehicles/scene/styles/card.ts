import { StyleSheet } from "react-native";

import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 13,
    marginHorizontal: 14,
    marginBottom: 20,
    borderRadius: 7,
    backgroundColor: Colors.white,
    position: 'relative',
    ...shadowStyles,
  },
  body: {
    paddingVertical: 10,
    paddingBottom: 13,
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: Colors.verylightBlue,
    borderRadius: 7,
    ...shadowStyles,
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
    fontWeight: 700,
    fontSize: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    lineHeight: 20,
  },
  age: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.mediumGrey,
    position: "absolute",
    top: 0,
  },
  details: {
    justifyContent: "space-between",
    gap: 10,
  },
  detailIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
  },
  detailsRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentCountText: {
    fontSize: 11,
    marginLeft: 22,
    fontWeight: 400,
    color: Colors.mediumGrey,
    textAlignVertical: "center",
    position: "absolute",
    width: 150,
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    maxWidth: "85%",
    fontWeight: 400,
  },
  unreadBadge: {
    backgroundColor: Colors.lightRed,
    width: 18,
    height: 18,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
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
