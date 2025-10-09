import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants/ui";
import { shadowStyles } from "../../../components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 14,
    paddingTop: 12,
    gap: 10,
  },
  greeting: {
    flex: 1,
  },
  hello: {
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
  },
  searchContainer: { 
    paddingHorizontal: 14,
    paddingVertical:  6,
    marginTop: 12
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sub: {
    fontSize: 13,
    color: Colors.mediumGrey,
    marginTop: 2,
  },
  brands: {
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 12,
    gap: 6,
    justifyContent: "space-between", 
  },
  brandsFlatlist: {
    marginBottom: 20,
    overflow: 'visible'
  },
  chip: {
    height: 90,
    flexDirection: "column",
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
    gap: 4,
  },
  brandLogo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 18,
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
    marginTop: 4
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  resetBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},

 
});