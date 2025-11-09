import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    paddingTop: 30,
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 14,
    paddingTop: 12
  },
  driver: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 15,
    alignItems: 'center'
  },
  nameText: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: 600,
    marginLeft: 18
  },
  addPaymentRow: {
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 15
  },
  addText: {
    color: Colors.mrDBlue,
    fontSize: 15,
  },
  addModal: {
    flexDirection: 'row',
    gap: 18
  },
  addInput: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingLeft: 12
  },
  amountText: {
    color: Colors.black,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: 'row'
  },
  textInput: {
    height: 40,
    color: Colors.black,
    fontSize: 14,
    paddingRight: 12,
  }
});
