import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";
import { shadowStyles } from "@/src/components/shadowStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    ...topOffset,
    ...shadowStyles,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  backButton: {
    marginBottom: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    margin: "auto",
  },
  menuButton: {
    padding: 4,
  },
  vehicleSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  vehicleSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    maxWidth: "80%",
  },
  vehicleSelectorImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
    marginRight: 12,
  },
  vehicleSelectorInfo: {
    flex: 1,
  },
  vehicleSelectorLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  vehicleSelectorModel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.mrDBlue,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e3c72",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e9ecef",
    marginHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#2d3748",
  },
  filterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  filterChipActive: {
    backgroundColor: "#1e3c72",
    borderColor: "#1e3c72",
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  applicantCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadowStyles,
  },

  applicantHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  applicantPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  applicantInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  age: {
    fontSize: 12,
    color: "#666",
    marginTop: -4,
  },
  applicantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: "#666",
  },
  locationText: {
    color: Colors.mediumGrey,
    fontSize: 13,
    maxWidth: "85%",
    fontWeight: 400,
  },
  vehicleText: {
    fontSize: 14,
    color: "#1e3c72",
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 4,
    textTransform: "capitalize",
  },
  applicantDetails: {
    borderTopWidth: 1,
    borderTopColor: "#f1f3f4",
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  appliedDate: {
    fontSize: 12,
    color: "#95a5a6",
    textAlign: "right",
  },
  // Vehicle Dropdown Styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: "80%",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
  },
  vehicleDropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  vehicleDropdownItemSelected: {
    backgroundColor: "#f8faff",
  },
  vehicleDropdownImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  vehicleDropdownInfo: {
    flex: 1,
  },
  vehicleDropdownModel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 4,
  },
  vehicleDropdownDetails: {
    fontSize: 12,
    color: "#666",
  },
  // Modal Styles (existing styles remain the same)
  modalContainer: {
    flex: 1,
    height: 400,
    // justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
  },
  modalHeaderSpacer: {
    width: 32,
  },
  modalBody: {
    padding: 20,
  },
  modalProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  modalPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  modalProfileInfo: {
    flex: 1,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 4,
  },
  modalRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  modalRatingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginLeft: 4,
    marginRight: 4,
  },
  modalReviews: {
    fontSize: 14,
    color: "#666",
  },
  modalStatus: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modalStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 12,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 16,
    color: "#2d3748",
    marginLeft: 12,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
  },
  coverLetter: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  acceptButton: {
    backgroundColor: "#27ae60",
  },
  contactButton: {
    backgroundColor: Colors.mrDBlue,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
});
