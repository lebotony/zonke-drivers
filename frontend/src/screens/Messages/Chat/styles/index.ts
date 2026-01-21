import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    // ...topOffset,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: Colors.skyLight,
  },
  name: {
    fontSize: 17,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.2,
  },
  status: {
    fontSize: 13,
    color: Colors.mediumGrey,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  dateDivider: {
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    color: Colors.mediumGrey,
    fontSize: 12,
    fontWeight: 500,
    marginVertical: 16,
  },
});
