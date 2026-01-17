import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    fontSize: 34,
    fontWeight: 600,
    letterSpacing: 0.3,
    color: Colors.darkCharcoalGrey,
    marginBottom: 24,
    marginLeft: 20,
    marginTop: 8,
  },
  profileCard: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 16,
    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    // Android shadow
    elevation: 2,
  },
  profileCardPressed: {
    backgroundColor: Colors.bg,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarPlaceholder: {
    position: "relative",
  },
  addBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.mrDBlue,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 14,
    color: Colors.mediumGrey,
    letterSpacing: 0.1,
  },
  // Deprecated styles below (kept for backward compatibility)
  avatarWrapper: {
    position: "relative",
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    borderRadius: "50%",
  },
  addText: {
    fontSize: 13,
    position: "absolute",
    color: Colors.mediumGrey,
    alignItems: "center",
    left: 16,
  },
  userWrapper: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 7,
  },
  infowrapper: {},
  userText: {
    fontSize: 18,
    marginLeft: 20,
  },
  descriptionText: {
    fontSize: 15,
    marginLeft: 20,
    color: Colors.mediumGrey,
  },
  forwardArrow: {
    color: Colors.lightGrey,
  },
  body: {
    marginTop: 35,
    backgroundColor: Colors.white,
    borderTopColor: Colors.whiteSmoke,
    borderTopWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: 1,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingLeft: 15,
  },
  itemLabelWrapper: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 17,
    height: "100%",
  },
  itemLabelText: {
    fontSize: 17,
  },
  iconWrapper: {
    borderRadius: 7,
    width: 35,
    height: 35,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
