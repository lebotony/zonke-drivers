import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { IS_IOS } from "@/constants/srcConstants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    flex: 1,
    lineHeight: IS_IOS ? undefined : 22,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: IS_IOS ? 40 : 10,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.mediumGrey,
    marginTop: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: Colors.mediumGrey,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.mrDBlue,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
    elevation: 2,
    shadowColor: Colors.mrDBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  messageButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
