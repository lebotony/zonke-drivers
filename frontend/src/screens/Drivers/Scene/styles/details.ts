import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  details: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  nameContainer: {
    gap: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  age: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 216, 84, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 14,
    fontWeight: 500,
    color: Colors.mediumGrey,
    flex: 1,
  },
  detailIcon: {
    width: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    width: "75%",
    fontWeight: 400,
  },
});
