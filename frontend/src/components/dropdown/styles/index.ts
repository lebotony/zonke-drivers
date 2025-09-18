import { StyleSheet } from "react-native";

import { Colors } from "../../../../constants/ui";

export const styles = StyleSheet.create({
  label: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 10,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden'
  },
  before: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
    opacity: 0.4,
    zIndex: -1,
  },
  inputText: {
    fontSize: 16,
    color: Colors.black,
  },
  placeholderText: {
    opacity: 0.3,
  },
  caretWrapper: {
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 4999,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    width: 'auto',
  },
  longText: {
    position: 'absolute',
    opacity: 0,
  },
});
