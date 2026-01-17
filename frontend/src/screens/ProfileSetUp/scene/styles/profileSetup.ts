import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
    color: Colors.black,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.black,
    marginBottom: 6,
    marginLeft: 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderStyle: "dashed",
    justifyContent: "center",
  },
  imageText: {
    color: Colors.mediumGrey,
    fontSize: 12,
    position: "absolute",
    left: 14,
    top: 53,
  },
  editButton: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bottom: -17,
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: "50%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
    color: Colors.grey,
    backgroundColor: Colors.bg,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.bg,
  },
  textArea: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  driverProfileText: {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 15,
  },
});
