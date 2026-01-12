import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";
import { shadowStyles } from "@/src/components/shadowStyles";
import { IS_IOS } from "@/constants/srcConstants";

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    borderColor: "#F2F2F2",
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
    paddingTop: IS_IOS ? 12 : 6,
    paddingBottom: IS_IOS ? 12 : 6,
  },
  textArea: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 7,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
  },
  inputText: {
    fontSize: 15,
    color: Colors.black,
    lineHeight: 15,
  },
  placeholderText: {
    opacity: 0.3,
  },
  caretWrapper: {
    alignItems: "center",
    paddingRight: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 4999,
  },
  dropdownMenu: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 8,
    zIndex: 5000,
    ...shadowStyles,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    width: "auto",
  },
  longText: {
    position: "absolute",
    opacity: 0,
  },
});
