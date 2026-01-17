import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";

type DarkLogoProps = {
  size?: "small" | "medium" | "large";
};

export const DarkLogo = ({ size = "small" }: DarkLogoProps) => {
  const sizeStyles = getDarkSizeStyles(size);

  return (
    <View style={[styles.container, sizeStyles.container]}>
      <View style={styles.logoWrapper}>
        <View style={[styles.iconContainer, sizeStyles.iconContainer]}>
          <LinearGradient
            colors={["#76CBED", "#5AB9E0", "#3DA7D3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Ionicons
              name="car-sport"
              size={sizeStyles.iconSize}
              color="#FFFFFF"
            />
          </LinearGradient>
        </View>

        <View style={styles.textContainer}>
          <MaskedView
            maskElement={
              <View>
                <Text style={[styles.brandText, sizeStyles.brandText]}>
                  ZONKE
                </Text>
              </View>
            }
          >
            <LinearGradient
              colors={["#FFFFFF", "#E0E0E0", "#FFFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={[styles.brandText, sizeStyles.brandText, { opacity: 0 }]}
              >
                ZONKE
              </Text>
            </LinearGradient>
          </MaskedView>

          <View style={styles.subTextWrapper}>
            <View style={[styles.divider, sizeStyles.divider]} />
            <Text style={[styles.subText, sizeStyles.subText]}>DRIVERS</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  iconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    gap: 2,
    backgroundColor: "yellow",
  },
  brandText: {
    fontFamily: "Poppins_700Bold",
    letterSpacing: -0.5,
    includeFontPadding: false,
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
    color: "#B0B0B0",
    letterSpacing: 2,
    includeFontPadding: false,
  },
});

const getDarkSizeStyles = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return {
        container: { height: 40 },
        iconContainer: { width: 38, height: 38 },
        iconSize: 20,
        brandText: { fontSize: 18, lineHeight: 22 },
        divider: { width: 16, height: 2 },
        subText: { fontSize: 8, lineHeight: 10 },
      };

    case "medium":
      return {
        container: { height: 60 },
        iconContainer: { width: 56, height: 56, borderRadius: 16 },
        iconSize: 30,
        brandText: { fontSize: 28, lineHeight: 34 },
        divider: { width: 24, height: 2.5 },
        subText: { fontSize: 11, lineHeight: 14 },
      };

    case "large":
      return {
        container: { height: 100 },
        iconContainer: { width: 88, height: 88, borderRadius: 24 },
        iconSize: 48,
        brandText: { fontSize: 42, lineHeight: 50 },
        divider: { width: 36, height: 3 },
        subText: { fontSize: 14, lineHeight: 18 },
      };
  }
};
