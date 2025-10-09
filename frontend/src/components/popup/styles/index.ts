import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants/ui";


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    
  },
  placeholderText: {
    opacity: 0.3,
  },
  iconWrapper: {
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 4999,
  },
  popupMenu: {
    position: 'absolute',
    backgroundColor: Colors.softGrey,
    borderRadius: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5000,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 8,
  },
  popupText: {
    fontSize: 15,
    width: 'auto',
  },
  longText: {
    position: 'absolute',
    opacity: 0,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  },
  dot: {
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: Colors.primaryBlue
  }
});
