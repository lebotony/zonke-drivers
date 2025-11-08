import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";
import { isIOS } from "@/src/helpers/platform";

const VERTIAL_MARGIN = 10;

export const styles = StyleSheet.create({
  body: {
    paddingTop: isIOS ? 25 : 0,
    paddingBottom: 70,
    margin: 15
  },
  profilePic: {
    alignItems: "center",
    gap: VERTIAL_MARGIN
  },
  defaultPic: {
    backgroundColor: Colors.whiteSmoke,
    alignItems: "center",
    justifyContent: "center",
    width: 125,
    height: 125,
    borderRadius: "50%",
  },
  name: {
    fontWeight: "700",
    fontSize: 20
  },
  age: {
    width: "100%",
    fontWeight: "400",
    fontSize: 14,
    color: Colors.mediumGrey,
    position: 'absolute',
    bottom: 2
  },
  description: {
    marginHorizontal: 'auto',
    width: '80%',
    padding: 10,
    backgroundColor: Colors.softGrey,
    borderRadius: 15,
    color: Colors.mediumDarkGrey,
    fontSize: 15.5,
    textAlign: "center",
    marginVertical: VERTIAL_MARGIN
  },
  platormsContainer: {
    justifyContent: "center",
    marginBottom: 15
  },
  location: {
    color: Colors.black,
    fontSize: 14,
    maxWidth: "85%"
  },
  headerLocation: {
    flexDirection: 'row',
    gap: 5,
  },
  pill: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 4,

    ...shadowStyles
  },
  heading: {
    fontSize: 15.5,
    fontWeight: 700,
    textAlign: "center",
    marginVertical: 8,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: VERTIAL_MARGIN
  },
  licenseCountry: {
    fontSize: 12,
    color: Colors.mediumDarkGrey
  },
  driverDetailsText: {
    fontSize: 15.5,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },
  stats: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
    marginBottom: 20,
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  stat: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 8,

    ...shadowStyles
  },
  statType: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: 500,
    textAlign: "center"
  },
  statValue: {
    fontWeight: 500
  },
  buttonText: {
    color: Colors.white,
    marginLeft: 6
  },
  commentsSection: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  footer: {
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: isIOS ? 12 : 0,

    ...shadowStyles
  },
});
