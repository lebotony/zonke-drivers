import { StyleSheet } from "react-native";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    ...topOffset,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 28,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.5,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.mediumDarkGrey,
  },
  tabActive: {
    color: Colors.mrDBlue,
    backgroundColor: Colors.skyLight,
  },
  messageList: {
    paddingTop: 8,
  },
  messageListContent: {
    paddingBottom: 16,
  },
});
