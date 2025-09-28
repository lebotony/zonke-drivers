import { StyleSheet } from "react-native";
import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 13,
    paddingTop: 10,
    marginHorizontal: 14,
    marginBottom: 20,
    borderRadius: 7,
    backgroundColor: Colors.white,
    ...shadowStyles,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.greyLighter,
    marginBottom: 7,
  },
  headerName: {
    color: Colors.black,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 700,
  },
  dateWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  time: {
    color: Colors.dimGrey,
    fontSize: 14,
    marginLeft: 5,
  },
  body: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 13,
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    backgroundColor: Colors.verylightBlue,
    borderRadius: 7,
    ...shadowStyles,
  },
  payments: {
    gap: 8
  },
  paymentText: {
    color: Colors.lightGreen,
    fontSize: 13,
    textAlign: "center"
  },
  amountText: {
    // color: Colors.lightGreen,
    textAlign: "center",
    fontSize: 13
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
    justifyContent: "space-evenly",
    gap: 4,
    maxWidth: "40%",
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
