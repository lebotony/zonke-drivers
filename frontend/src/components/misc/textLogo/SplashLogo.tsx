import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/ui";

type SplashLogoProps = {
  onAnimationComplete?: () => void;
};

export const SplashLogo = ({ onAnimationComplete }: SplashLogoProps) => {
  const iconScale = useSharedValue(0);
  const iconRotate = useSharedValue(0);
  const iconGlow = useSharedValue(0);

  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.8);

  const lineWidth = useSharedValue(0);
  const lineOpacity = useSharedValue(0);

  useEffect(() => {
    // Icon animation with spring and rotation
    iconScale.value = withSpring(1, {
      damping: 10,
      stiffness: 80,
    });

    iconRotate.value = withSequence(
      withTiming(360, {
        duration: 800,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      }),
      withTiming(360, { duration: 0 }),
    );

    iconGlow.value = withSequence(
      withDelay(400, withTiming(1, { duration: 300 })),
      withTiming(0.6, { duration: 400 }),
    );

    // Text animations
    textOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );

    textScale.value = withDelay(
      500,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
      }),
    );

    // Line animation
    lineOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    lineWidth.value = withDelay(
      800,
      withSpring(
        1,
        {
          damping: 15,
          stiffness: 90,
        },
        () => {
          if (onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        },
      ),
    );
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotate.value}deg` },
    ],
  }));

  const iconGlowStyle = useAnimatedStyle(() => ({
    opacity: iconGlow.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  const lineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: lineOpacity.value,
    width: `${lineWidth.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.logoContent}>
        <View style={styles.iconWrapper}>
          <Animated.View style={[styles.iconGlow, iconGlowStyle]} />

          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <LinearGradient
              colors={["#76CBED", "#5AB9E0", "#3DA7D3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Ionicons name="car-sport" size={56} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>
        </View>

        <Animated.View style={[styles.textWrapper, textAnimatedStyle]}>
          <MaskedView
            maskElement={
              <View>
                <Text style={styles.brandText}>ZONKEK</Text>
              </View>
            }
          >
            <LinearGradient
              colors={["#1C1B1F", "#3A3A3F", "#1C1B1F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.brandText, { opacity: 0 }]}>ZONKE</Text>
            </LinearGradient>
          </MaskedView>

          <View style={styles.subTextContainer}>
            <Animated.View style={[styles.divider, lineAnimatedStyle]} />
            <Text style={styles.subText}>DRIVERS</Text>
          </View>

          <Text style={styles.tagline}>Premium Driver Marketplace</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContent: {
    alignItems: "center",
    gap: 24,
  },
  iconWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.mrDBlue,
    opacity: 0.2,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: Colors.mrDBlue,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  iconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    alignItems: "center",
    gap: 8,
  },
  brandText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1,
    includeFontPadding: false,
  },
  subTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  divider: {
    height: 3,
    backgroundColor: Colors.mrDBlue,
    borderRadius: 2,
  },
  subText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: Colors.mediumGrey,
    letterSpacing: 4,
    includeFontPadding: false,
  },
  tagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.mediumLightGrey,
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
