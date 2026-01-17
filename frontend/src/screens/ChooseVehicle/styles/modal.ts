import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.mrDBlue}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.bg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 20,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    flex: 1,
  },
  messageCard: {
    backgroundColor: `${Colors.emeraldGreen}08`,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${Colors.emeraldGreen}20`,
    marginBottom: 24,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  messageText: {
    fontSize: 15,
    color: Colors.darkCharcoalGrey,
    flex: 1,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 600,
    color: Colors.emeraldGreen,
  },
  warningText: {
    fontSize: 14,
    color: Colors.mediumGrey,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    paddingVertical: 14,
    borderRadius: 16,
    shadowOpacity: 0,
    elevation: 0,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.mediumGrey,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: Colors.emeraldGreen,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: Colors.emeraldGreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.white,
  },
});
