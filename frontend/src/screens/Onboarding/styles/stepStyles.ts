import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/ui";

export const stepStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroSection: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: "center",
    marginBottom: 20,
  },
  progressContainer: {
    width: "100%",
    maxWidth: 300,
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.lightGrey,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.mrDBlue,
    borderRadius: 3,
  },
  stepIndicator: {
    fontSize: 13,
    color: Colors.grey,
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 20,
  },
  avatarTouchable: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
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
    overflow: "hidden",
  },
  avatarWrapperFilled: {
    borderStyle: "solid",
    borderColor: Colors.mrDBlue,
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.mrDBlue,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  avatarLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.mrDBlue,
  },
  nextButton: {
    backgroundColor: Colors.mrDBlue,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    textAlign: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  buttonHalf: {
    flex: 1,
  },
});
