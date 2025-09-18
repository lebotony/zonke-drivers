import { StyleSheet } from "react-native";

import { Colors } from "../../../../../constants/ui";

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: Colors.black,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 6,
    marginLeft: 2,
  },
  avatarWrapper: {
    width: "100%",
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 30 ,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    bottom: -17,
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: "50%",
  },
  skipBtn: {
    color: Colors.primaryBlue,
    position: "absolute",
    justifyContent: 'center',
    top: "50%",
    right: 35,
    fontWeight: 800,
    fontSize: 16,
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
    backgroundColor: Colors.bg
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.bg
  },
  textArea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
})