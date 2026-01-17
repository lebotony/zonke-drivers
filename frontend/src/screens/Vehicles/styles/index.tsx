import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants/ui";
import { shadowStyles } from "../../../components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 28,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    ...shadowStyles,
  },
  iosHeader: {
    backgroundColor: "#F5F5F7",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  greeting: {
    flex: 1,
  },
  hello: {
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  searchContainer: {
    paddingVertical: 6,
    marginTop: 12,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sub: {
    fontSize: 13,
    color: Colors.mediumGrey,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  seeAll: {
    fontSize: 15,
    color: Colors.mrDBlue,
    fontWeight: 600,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
  },
});
