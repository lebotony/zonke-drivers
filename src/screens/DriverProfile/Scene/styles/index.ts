import { Colors } from "@constants/ui";
import { StyleSheet } from "react-native";

const VERTIAL_MARGIN = 10;

export const styles = StyleSheet.create({
  body: {
    margin: 15
  },
  profilePic: {
    alignItems: "center",
    gap: VERTIAL_MARGIN
  },
  name: {
    fontWeight: "700",
    fontSize: 18
  },
  age: {
    fontWeight: "400",
    fontSize: 16,
    color: Colors.mediumGrey
  },
  description: {
    color: Colors.mediumDarkGrey,
    fontSize: 15,
    textAlign: "center",
    marginVertical: VERTIAL_MARGIN
  },
  platormsContainer: {
    justifyContent: "center",
    marginBottom: VERTIAL_MARGIN
  },
  location: {
    color: Colors.black,
    fontSize: 13
  },
  pill: {
    borderRadius: 100,
    backgroundColor: Colors.lightGrey,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  heading: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 8,
    textDecorationLine: "underline",
    fontStyle: "italic"
  },
  row: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginBottom: VERTIAL_MARGIN
  },
  licenseCountry: {
    fontSize: 12,
    color: Colors.mediumDarkGrey
  },
  stats: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    marginVertical: 12
  },
  statsRow: {
    padding: 9,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stat: {
    width: 75,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5
  },
  statType: {
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.mediumDarkGrey,
    textAlign: "center"
  },
  statValue: {
    fontWeight: 500
  },
  actions: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0
  },
  buttonText: {
    color: Colors.white,
    marginLeft: 6
  }
});
