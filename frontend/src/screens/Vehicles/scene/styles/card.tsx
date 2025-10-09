import { StyleSheet } from "react-native";
import { Colors } from "../../../../../constants/ui";
import { shadowStyles } from "../../../../components/shadowStyles";


export const styles = StyleSheet.create({
     card: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    ...shadowStyles,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'lime'
  },
  cardTop: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  modelText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },

   actions: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: "auto",
    gap: 20,
  },

  imgContainer: {
    width: '40%'
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 18,
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.veryDarkGrey,
  },
  location: {
    flexDirection: 'row',
    gap: 4,
  },
  locationText: {
    color: Colors.mediumGrey,
    fontSize: 13,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
  },

  bottomRow: {
    justifyContent: "center",
    marginTop: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 4,
  },
  numReviews: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 14,
    backgroundColor: Colors.mrDBlue,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: '70%'
  },
  perDay: {
    color: Colors.whiteSmoke,
  },
  viewText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.white,
    lineHeight: 14,
  }
})