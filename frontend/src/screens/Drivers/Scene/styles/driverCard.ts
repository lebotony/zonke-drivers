import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2, // Android only
    borderRadius: 20,
    marginHorizontal: 16,
  },

  cardContent: {
    padding: 20,
  },
  topSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoSection: {
    flex: 1,
    justifyContent: "center",
  },
  defaultPic: {
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
    width: 92,
    height: 92,
    borderRadius: 16,
  },
  platformsSection: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.04)",
  },
  platformsContainer: {
    paddingHorizontal: 0,
  },
  actionsSection: {
    // paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.04)",
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.mrDBlue,
    borderRadius: 12,
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGreen,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  viewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 18,
  },
  viewProfileText: {
    color: Colors.mrDBlue,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    lineHeight: 19,
  },
  age: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.mediumGrey,
    position: "absolute",
    top: 0,
  },
  details: {
    marginLeft: 4,
    justifyContent: "space-evenly",
    gap: 2,
    flex: 1,
  },
  detailIcon: {
    width: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  ratingRow: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 600,
    textAlignVertical: "center",
    color: "rgba(0, 0, 0, 0.69)",
  },
  ratingCreteria: {
    width: 120,
    fontSize: 11,
    fontWeight: 400,
    color: Colors.mediumGrey,
    textAlignVertical: "center",
    position: "absolute",
    top: 2.1,
  },
  address: {
    color: Colors.mediumGrey,
    fontSize: 13,
    width: "75%",
    fontWeight: 400,
  },
  save: {
    position: "absolute",
    right: 10,
    top: 8,
  },
  cardBtns: {
    paddingVertical: 6,
    backgroundColor: Colors.lightGreen,
    width: "48%",
  },
  viewProfileBtn: {
    paddingVertical: 4,
  },
});
