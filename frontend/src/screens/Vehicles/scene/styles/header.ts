import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingTop: 5
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: 'center'
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 5,
  },
})