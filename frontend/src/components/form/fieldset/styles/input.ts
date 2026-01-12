import { IS_IOS } from "@/constants/srcConstants";
import { Colors } from "@/constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    marginLeft: 2,
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: 6,

    paddingHorizontal: 12,
    marginBottom: 16,
    borderColor: "#F2F2F2",
    borderWidth: 1,
  },
  // inputIcon: {
  //   marginRight: 8,
  //   color: Colors.grey,
  //   backgroundColor: Colors.whiteSmoke,
  // },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.inputBackground,
    paddingTop: 12,
    paddingBottom: 12,
  },
  textArea: {
    minHeight: 65,
    textAlignVertical: "top",
    includeFontPadding: false,
    paddingTop: 0,
    fontSize: 15,
  },
});
