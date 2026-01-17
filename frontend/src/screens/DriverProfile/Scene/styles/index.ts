import { shadowStyles } from "@/src/components/shadowStyles";
import { Colors } from "@/constants/ui";
import { StyleSheet, Platform } from "react-native";
import { isIOS } from "@/src/helpers/platform";
import { IS_IOS } from "@/constants/srcConstants";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

const IS_ANDROID = Platform.OS === "android";

const SHADOWS = {
  soft: {
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: IS_ANDROID ? 0.04 : 0.08,
    shadowRadius: IS_ANDROID ? 4 : 8,
    elevation: IS_ANDROID ? 2 : 3,
  },
  medium: {
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: IS_ANDROID ? 0.06 : 0.12,
    shadowRadius: IS_ANDROID ? 6 : 12,
    elevation: IS_ANDROID ? 3 : 5,
  },
  strong: {
    shadowColor: Colors.mrDBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: IS_ANDROID ? 0.08 : 0.15,
    shadowRadius: IS_ANDROID ? 8 : 16,
    elevation: IS_ANDROID ? 4 : 8,
  },
};

export const styles = StyleSheet.create({
  // Hero Section
  heroSection: {
    paddingTop: isIOS ? 20 : 0,
    marginTop: IS_ANDROID ? 20 : 0,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },

  profileHeroCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: SPACING.xxl,
    paddingTop: SPACING.md,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: IS_ANDROID ? 0.1 : 0.18,
    shadowRadius: IS_ANDROID ? 10 : 16,
    elevation: IS_ANDROID ? 6 : 8,
  },

  backButtonContainer: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    zIndex: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.soft,
  },

  backArrowOverride: {
    position: "relative" as const,
    left: Platform.OS === "android" ? -1 : 0,
    top: 0,
  },

  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  avatarContainer: {
    marginBottom: SPACING.md,
    marginTop: SPACING.xxl,
    zIndex: 10,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatarBorder: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: Colors.mrDBlue + "20",
  },

  defaultPicModern: {
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.mrDBlue + "30",
  },

  nameSection: {
    alignItems: "center",
    marginBottom: SPACING.sm,
    zIndex: 10,
  },

  nameModern: {
    fontSize: 26,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: 4,
    textAlign: "center",
  },

  ageModern: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },

  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.mrDBlue + "15",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    marginBottom: SPACING.sm,
    zIndex: 10,
  },

  locationText: {
    fontSize: 14,
    fontWeight: 500,
    color: Colors.mrDBlue,
    maxWidth: 250,
  },

  ratingBadgeModern: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.yellow + "20",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    zIndex: 10,
  },

  ratingTextModern: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },

  ratingLabelModern: {
    fontSize: 13,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },

  // Content Section
  contentSection: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },

  // Description Card
  descriptionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS.soft,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: Colors.mediumGrey,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },

  descriptionModern: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.mediumDarkGrey,
    fontWeight: 400,
  },

  // Quick Stats Card
  quickStatsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    ...SHADOWS.soft,
  },

  quickStatItem: {
    alignItems: "center",
    gap: SPACING.xs,
    flex: 1,
  },

  quickStatIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },

  quickStatValue: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },

  quickStatLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: Colors.mediumGrey,
  },

  quickStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGrey,
  },

  // Section Card
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS.soft,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: SPACING.md,
  },

  platormsContainer: {
    justifyContent: "center",
  },

  // Detailed Stats Card
  detailedStatsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    ...SHADOWS.soft,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    justifyContent: "space-between",
  },

  statCardModern: {
    width: "47%",
    backgroundColor: Colors.bg,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },

  statIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.soft,
  },

  statValueModern: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
  },

  statLabelModern: {
    fontSize: 12,
    fontWeight: 500,
    color: Colors.mediumGrey,
    textAlign: "center",
  },

  // Comments Button
  commentsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.mrDBlue,
    marginBottom: 30,
    ...SHADOWS.soft,
  },

  commentsButtonText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.mrDBlue,
  },

  // Floating Footer
  floatingFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey + "50",
    ...SHADOWS.medium,
  },

  footerButtonContainer: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 14,
  },

  hireButton: {
    flex: 1,
  },

  messageButtonHalf: {
    flex: 1,
  },

  messageButtonModern: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 14,
  },

  actionButtonText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.white,
  },

  messageButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.white,
  },

  // Legacy styles (kept for backward compatibility with other components)
  body: {
    paddingTop: isIOS ? 25 : 0,
    margin: 15,
  },
  profilePic: {
    alignItems: "center",
    gap: 10,
  },
  defaultPic: {
    backgroundColor: Colors.whiteSmoke,
    alignItems: "center",
    justifyContent: "center",
    width: 125,
    height: 125,
    borderRadius: "50%",
  },
  nameAgeWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
  },
  age: {
    fontWeight: 400,
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  description: {
    marginHorizontal: "auto",
    width: "80%",
    padding: 10,
    backgroundColor: Colors.softGrey,
    borderRadius: 15,
    color: Colors.mediumDarkGrey,
    fontSize: 15.5,
    textAlign: "center",
    marginVertical: 10,
  },
  location: {
    color: Colors.black,
    fontSize: 14,
    maxWidth: "85%",
  },
  headerLocation: {
    flexDirection: "row",
    gap: 5,
  },
  pill: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
    ...shadowStyles,
  },
  heading: {
    fontSize: 15.5,
    fontWeight: 600,
    textAlign: "center",
    marginVertical: 8,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  licenseCountry: {
    fontSize: 12,
    color: Colors.mediumDarkGrey,
  },
  driverDetailsText: {
    fontSize: 15.5,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },
  stats: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    marginBottom: 20,
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  stat: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 8,
    ...shadowStyles,
  },
  statType: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: 500,
    textAlign: "center",
  },
  statValue: {
    fontWeight: 500,
  },
  buttonText: {
    color: Colors.white,
    marginLeft: 6,
  },
  commentsSection: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...shadowStyles,
  },
});
