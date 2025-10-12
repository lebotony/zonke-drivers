import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  hero: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },

  meta: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    gap: 12,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
  },

  ratingContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rating: {
    flexDirection: "row",
    ...shadowStyles,
  },
  ratingText: {
    marginLeft: 2,
    fontWeight: "600",
  },

  infoContainer: {
    marginTop: -2,
  },
  infoRow: {
    flexDirection: "row",
    rowGap: 6,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  xsIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
  },
  xIconWrapper: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: "50%",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
  },
  readText: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.mrDBlue,
  },

  descriptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },

  descriptionText: {
    fontSize: 14,
    color: Colors.darkCharcoalGrey,
    lineHeight: 20,
    flexShrink: 1,
  },

  readMoreInline: {
    marginBottom: 14,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.mrDBlue,
    marginLeft: 4,
    alignSelf: "flex-end",
  },

  description: {},
  overView: {},
  infoTitle: {
    fontSize: 15,
    fontWeight: 500,
    opacity: 0.6,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },

  statLabel: {
    fontWeight: "700",
    fontSize: 16,
  },

  statValue: {
    color: Colors.mediumGrey,
    marginTop: 4,
    fontSize: 12,
  },

  infoItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    width: 125,
  },

  footerRow: {
    flexDirection: "row",
    marginTop: 12,
    flex: 1,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.darkCharcoalGrey,
  },

  bookButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
});
