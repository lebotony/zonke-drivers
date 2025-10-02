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
    ...shadowStyles,
  },
  body: {
    paddingVertical: 10,
    paddingBottom: 13,
    flexDirection: "row",
    gap: 13,
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
    ...shadowStyles
  },
  paymentText: {
    color: Colors.lightGreen,
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center"
  },
  amountText: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 16
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    lineHeight: 14,
  },
  age: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.mediumGrey,
    position: 'absolute',
    top: 0
  },
  details: {
    justifyContent: "space-between",
    gap: 10,
  },
  detailIcon: {
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 3
  },
  ratingRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 700,
    textAlignVertical: "center",
    color: "rgba(0, 0, 0, 0.69)"
  },
  ratingCreteria: {
    width: 120,
    fontSize: 11,
    fontWeight: 400,
    color: Colors.mediumGrey,
    textAlignVertical: "center",
    position: 'absolute',
    top: 2.1,
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    maxWidth: "85%",
    fontWeight: 400
  },
});
