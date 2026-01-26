import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Premium Header Section
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTextContainer: {
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: 400,
    color: Colors.mediumGrey,
    lineHeight: 22,
  },

  // Toggle Section
  toggleSection: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.lighterGrey,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.white,
    ...shadowStyles,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },
  toggleButtonTextActive: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.mrDBlue,
  },

  // Section Layout
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: Colors.mediumGrey,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Premium Image Upload Card
  imageCard: {
    marginHorizontal: 16,
    marginBottom: 28,
  },
  imageUploadArea: {
    width: "100%",
    aspectRatio: 16 / 10,
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: "hidden",
    position: "relative",
    ...shadowStyles,
    shadowOpacity: 0.08,
    elevation: 3,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  imageEditBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.mrDBlue,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
    shadowOpacity: 0.2,
  },
  emptyImageState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    borderWidth: 2,
    borderColor: Colors.lighterGrey,
    borderStyle: "dashed",
    borderRadius: 16,
    margin: 1,
  },
  uploadIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.lighterBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadPromptText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: 6,
  },
  uploadHintText: {
    fontSize: 13,
    fontWeight: 400,
    color: Colors.mediumGrey,
  },

  // Driver Card
  driverCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...shadowStyles,
    shadowOpacity: 0.06,
    elevation: 2,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  driverAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lighterBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  driverTextContainer: {
    flex: 1,
    gap: 4,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },
  driverSubtext: {
    fontSize: 13,
    fontWeight: 400,
    color: Colors.mediumGrey,
  },
  assignButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.mrDBlue,
  },
  assignButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.white,
  },

  // Cards Group
  cardsGroup: {
    gap: 10,
  },

  // Actions Container
  actionsContainer: {
    paddingTop: 8,
    gap: 12,
  },
  activationSection: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    ...shadowStyles,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  activationInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  activationText: {
    flex: 1,
    fontSize: 13,
    fontWeight: 400,
    color: Colors.mediumGrey,
    lineHeight: 18,
  },
  activationButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activationButtonText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.white,
  },
  primaryButton: {
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyles,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.white,
    letterSpacing: 0.2,
  },

  // Legacy (Keep for backward compatibility during transition)
  headerWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
  },
  driverContainer: {
    marginBottom: 14,
  },
  profileWrapper: {
    flexDirection: "row",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  profileName: {
    fontSize: 15,
  },
  age: {
    fontSize: 12,
  },
  addNewBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
  },
  addNewText: {
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 13,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...shadowStyles,
  },
  driverImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dropdowmIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.whiteSmoke,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyles: {
    flexGrow: 1,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 15,
  },
});
