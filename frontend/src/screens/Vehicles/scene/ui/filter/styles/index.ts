import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  viewAll: {
    color: Colors.mrDBlue,
  },
  wrapper: {},
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  resetBtn: {
    position: "absolute",
    right: 26,
  },
  contentSection: {
    flexDirection: "column",
    gap: 10,
  },
  contentTitle: {
    fontWeight: 600,
  },
  chipFlatlist: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  chipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fuelCheckbox: {
    paddingTop: 5,
    paddingLeft: 16,
  },
  fuelOptions: {
    flexDirection: "row",
    paddingTop: 8,
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "transparent",
  },
  reviewContainer: {
    paddingHorizontal: 16,
  },
  reviewText: {
    marginVertical: 12,
    fontWeight: 600,
  },
  ratingBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  activeRadio: {
    borderColor: Colors.mrDBlue,
    borderWidth: 2,
  },
  inactiveRadio: {
    borderColor: Colors.mediumGrey,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: Colors.mrDBlue,
  },
  footer: {
    marginTop: 18,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  footerBtn: {
    backgroundColor: Colors.mrDBlue,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  footerText: {
    color: Colors.white,
    fontWeight: 600,
  },
});
