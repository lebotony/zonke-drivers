import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { IS_IOS } from "@/constants/srcConstants";
import { topOffset } from "@/src/components/appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGrey,
    gap: 8,
    ...topOffset,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 44,
  },
  backArrowOverride: {
    top: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.darkCharcoalGrey,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.mediumGrey,
    paddingLeft: 56,
  },
  listContent: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
