import { StyleSheet, Platform } from "react-native";

import { Colors } from "@/constants/ui";

const IS_ANDROID = Platform.OS === "android";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

const SHADOWS = {
  soft: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: IS_ANDROID ? 0.04 : 0.06,
    shadowRadius: IS_ANDROID ? 4 : 8,
    elevation: 1,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: IS_ANDROID ? 0.06 : 0.1,
    shadowRadius: IS_ANDROID ? 6 : 12,
    elevation: 1,
  },
};

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: 24,
  },

  // Hero Section
  heroSection: {
    paddingBottom: SPACING.sm,
    alignItems: "center",
    // marginTop: -SPACING.xs,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.3,
    marginBottom: SPACING.xs,
    marginTop: 0,
  },

  headerSubtitle: {
    fontSize: 15,
    fontWeight: 400,
    color: Colors.mediumGrey,
    letterSpacing: 0.1,
  },

  // Avatar Card
  avatarCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: SPACING.xxl,
    marginBottom: SPACING.xl,
    alignItems: "center",
    ...SHADOWS.soft,
  },

  avatarTouchable: {
    alignItems: "center",
  },

  avatarContainer: {
    position: "relative",
    marginBottom: SPACING.md,
  },

  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: Colors.lightGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
  },

  avatarWrapperFilled: {
    borderWidth: 0,
    borderStyle: "solid",
  },

  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.mrDBlue,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.white,
    ...SHADOWS.soft,
  },

  avatarLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.mrDBlue,
    letterSpacing: 0.2,
  },

  // Section Card
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.soft,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    marginBottom: SPACING.lg,
    letterSpacing: 0.2,
  },

  // Driver Section
  driverSection: {
    marginTop: SPACING.sm,
  },

  driverSectionHeader: {
    marginBottom: SPACING.lg,
  },

  driverHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mrDBlue + "10",
    padding: SPACING.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.mrDBlue + "20",
  },

  driverIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
    ...SHADOWS.soft,
  },

  driverSectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.2,
    marginBottom: 2,
  },

  driverSectionSubtitle: {
    fontSize: 13,
    fontWeight: 500,
    color: Colors.mediumGrey,
    letterSpacing: 0.1,
  },

  driverFieldsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: Colors.mrDBlue + "15",
    ...SHADOWS.soft,
  },

  // Save Button
  saveButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: 14,
    ...SHADOWS.medium,
  },

  saveButtonText: {
    color: Colors.white,
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0.3,
  },

  // Legacy styles (for compatibility with original component)
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
    color: Colors.black,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.black,
    marginBottom: 6,
    marginLeft: 2,
  },
  imageText: {
    color: Colors.mediumGrey,
    fontSize: 12,
    position: "absolute",
    left: 14,
    top: 53,
  },
  editButton: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bottom: -17,
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.grey,
    backgroundColor: Colors.bg,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.bg,
  },
  textArea: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  driverProfileText: {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 15,
  },
});
