import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants/ui";
import { shadowStyles } from "../../../components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
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
  greeting: {
    flex: 1,
  },
  hello: {
    fontWeight: "700",
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
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
  },
  seeAll: {
    fontSize: 15,
    color: Colors.mrDBlue,
    fontWeight: "600",
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
