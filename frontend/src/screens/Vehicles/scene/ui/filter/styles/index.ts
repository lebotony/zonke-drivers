import { StyleSheet } from "react-native";
import { Colors } from "../../../../../../../constants/ui";


export const styles = StyleSheet.create({
    filterContainer: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  row: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
   },
  viewAll: {
    color: Colors.mrDBlue
  },
  wrapper: {
    padding: 16
  },
  header: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  resetBtn: {
    position: 'absolute',
    right: 10
  },
  contentSection: {
    marginTop: 12
  },
  contentTitle: {
    fontWeight: '600'
  },
  chipFlatlist: {
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  chipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 16,
  },
  fuelCheckbox: {
    marginVertical: 14
  },
  fuelOptions: {
    flexDirection: 'row',
    paddingTop: 8 
  },
  checkbox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent'
  },
  reviewContainer: {
    fontWeight: '700',
    marginVertical: 12
  },
  ratingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ratingText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeRadio: {
    borderColor: Colors.mrDBlue,
    borderWidth: 2
  },
  inactiveRadio: {
    borderColor: Colors.mediumGrey
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: Colors.mrDBlue
  },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16
  },
  footerBtn: {
    backgroundColor: Colors.mrDBlue,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  footerText: {
    color: Colors.white,
    fontWeight: '700'
  }
})