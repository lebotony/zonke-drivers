import { Colors } from "../../../../../constants/ui";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: "red",
  },
  iconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    gap: 2,
  },
  brandText: {
    fontFamily: "Poppins_700Bold",
    letterSpacing: -0.5,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  subTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: -2,
  },
  divider: {
    backgroundColor: Colors.mrDBlue,
    borderRadius: 2,
  },
  subText: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.mediumGrey,
    letterSpacing: 2,
    includeFontPadding: false,
  },
});

export const getSizeStyles = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return StyleSheet.create({
        container: {
          height: 40,
        },
        iconContainer: {
          width: 38,
          height: 38,
        },
        iconSize: 20,
        brandText: {
          fontSize: 18,
          lineHeight: 22,
        },
        divider: {
          width: 16,
          height: 2,
        },
        subText: {
          fontSize: 8,
          lineHeight: 10,
        },
      });

    case "medium":
      return StyleSheet.create({
        container: {
          height: 60,
        },
        iconContainer: {
          width: 56,
          height: 56,
          borderRadius: 16,
        },
        iconSize: 30,
        brandText: {
          fontSize: 28,
          lineHeight: 34,
        },
        divider: {
          width: 24,
          height: 2.5,
        },
        subText: {
          fontSize: 11,
          lineHeight: 14,
        },
      });

    case "large":
      return StyleSheet.create({
        container: {
          height: 100,
        },
        iconContainer: {
          width: 88,
          height: 88,
          borderRadius: 24,
        },
        iconSize: 48,
        brandText: {
          fontSize: 42,
          lineHeight: 50,
        },
        divider: {
          width: 36,
          height: 3,
        },
        subText: {
          fontSize: 14,
          lineHeight: 18,
        },
      });
  }
};
