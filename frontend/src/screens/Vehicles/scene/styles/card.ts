import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
    marginTop: 5,
    borderRadius: 12,
    flexDirection: "column",
    ...shadowStyles,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  leftInfo: {
    flexDirection: "column",
  },
  rightInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  carName: {
    fontSize: 18,
    fontWeight: 600,
  },
  model: {
    fontSize: 15,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 17,
    fontWeight: 700,
    color: Colors.mrDBlue,
  },
  perDay: {},
  iconWrapper: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: Colors.mrDBlue,
    transform: [{ rotate: "330deg" }],
  },
  rating: {
    flexDirection: "row",
    gap: 2,
  },
  ratingValue: {
    fontSize: 15,
  },
  imgContainer: {
    position: "relative",
    width: "100%",
    height: 250,
    backgroundColor: "pink",
    borderRadius: 12,
  },
  leftFlap: {
    position: "absolute",
    width: "80%",
    height: "30%",
    zIndex: -1,
    left: 10,
    top: -10,
    backgroundColor: Colors.lightGrey,
    opacity: 0.2,
    borderRadius: 14,
    transform: [{ rotate: "5deg" }],
  },
  rightFlap: {
    position: "absolute",
    width: "80%",
    height: "30%",
    zIndex: -1,
    top: -10,
    right: 10,
    backgroundColor: Colors.lightGrey,
    opacity: 0.25,
    borderRadius: 14,
    transform: [{ rotate: "175deg" }],
  },
  footer: {},
});
