import { StyleSheet, Platform } from "react-native";

import { Colors } from "@/constants/ui";
import { IS_IOS } from "@/constants/srcConstants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 110 : 90,
  },

  // Hero Section - Immersive Design
  heroContainer: {
    position: "relative",
    width: "100%",
    height: 420,
    backgroundColor: Colors.softGrey,
  },

  hero: {
    width: "100%",
    height: "100%",
  },

  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
  },

  headerActions: {
    position: "absolute",
    top: Platform.OS === "ios" ? 55 : 45,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  headerRightActions: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Content Section - Modern Card Layout
  contentContainer: {
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingTop: 28,
    paddingHorizontal: 20,
    gap: 20,
  },

  // Title Section
  titleSection: {
    gap: 16,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  titleContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  vehicleTitle: {
    fontSize: 28,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.8,
    lineHeight: 34,
  },

  yearBadge: {
    backgroundColor: Colors.skyLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },

  yearBadgeText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.mrDBlue,
    letterSpacing: 0.2,
  },

  // Price Tag - Next to Title
  priceTag: {
    alignItems: "flex-end",
  },

  priceValue: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.mrDBlue,
    lineHeight: 28,
    letterSpacing: -0.5,
  },

  priceLabel: {
    fontSize: 11,
    color: Colors.mediumGrey,
    fontWeight: 600,
    letterSpacing: 0.2,
  },

  // Metadata Row
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },

  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metadataIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
  },

  metadataText: {
    fontSize: 14,
    color: Colors.mediumGrey,
    fontWeight: 600,
    letterSpacing: 0.1,
  },

  // Owner Card
  ownerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  ownerInfo: {
    flex: 1,
    gap: 2,
  },

  ownerLabel: {
    fontSize: 12,
    color: Colors.mediumGrey,
    fontWeight: 500,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  ownerName: {
    fontSize: 16,
    color: Colors.darkCharcoalGrey,
    fontWeight: 600,
    letterSpacing: -0.2,
  },

  // Description Card
  descriptionCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.3,
  },

  descriptionText: {
    fontSize: 15,
    color: Colors.mediumGrey,
    lineHeight: 24,
    fontWeight: 400,
    letterSpacing: 0.1,
  },

  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    marginTop: 4,
  },

  readMoreText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.mrDBlue,
    letterSpacing: 0.1,
  },

  // Specifications Section - 2 Rows x 3 Columns Grid
  specsSection: {
    gap: 16,
  },

  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  specCard: {
    width: "32%",
    backgroundColor: Colors.white,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: "center",
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  specIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
  },

  specTitle: {
    fontSize: 11,
    color: Colors.mediumGrey,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  specValue: {
    fontSize: 14,
    color: Colors.darkCharcoalGrey,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: -0.2,
  },

  // Action Bar - Compact Modern Design with Equal Widths
  actionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 22 : 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.softGrey,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.mrDBlue,
    backgroundColor: Colors.white,
  },

  buttonIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.mrDBlue,
    letterSpacing: -0.2,
  },

  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.mrDBlue,
    ...Platform.select({
      ios: {
        shadowColor: Colors.mrDBlue,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  primaryButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.white,
    letterSpacing: -0.2,
  },

  // Fullscreen Modal
  fullscreenModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },

  fullscreenContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },

  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 55 : 45,
    left: 20,
    zIndex: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Legacy styles (kept for compatibility)
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },

  meta: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    gap: 12,
  },
});
