import { IS_ANDROID } from "@/constants/srcConstants";

import { StyleSheet } from "react-native";

import { Colors } from "../../../../../constants/ui";

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 6,
    marginLeft: 2,
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 6,
    paddingHorizontal: 12,
    padding: !IS_ANDROID ? 7 : undefined,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.grey,
    backgroundColor: Colors.whiteSmoke,
  },
  input: {
    borderWidth: 0,
    outlineWidth: 0,
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.whiteSmoke,
  },
  textArea: {
    minHeight: 65,
    flex: 1,
    textAlignVertical: "top",
    includeFontPadding: false,
    paddingTop: 0,
  },
});
