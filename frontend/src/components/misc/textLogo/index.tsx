import { useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  Easing,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { styles, getSizeStyles } from "./styles";

type TextLogoProps = {
  size: "small" | "medium" | "large";
  animated?: boolean;
};

export const TextLogo = ({ size, animated = false }: TextLogoProps) => {
  const sizeStyles = getSizeStyles(size);

  const iconScale = useSharedValue(0);
  const iconRotate = useSharedValue(0);
  const textOpacity = useSharedValue(animated ? 0 : 1);
  const textTranslateY = useSharedValue(animated ? 10 : 0);
  const gradientPosition = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      iconScale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });

      iconRotate.value = withSequence(
        withTiming(360, {
          duration: 600,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
        withTiming(360, { duration: 0 }),
      );

      textOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));

      textTranslateY.value = withDelay(
        200,
        withSpring(0, {
          damping: 15,
          stiffness: 90,
        }),
      );
    }
  }, [animated]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotate.value}deg` as any },
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={[styles.container, sizeStyles.container]}>
      <View style={styles.logoWrapper}>
        <Animated.View
          style={[
            styles.iconContainer,
            sizeStyles.iconContainer,
            iconAnimatedStyle,
          ]}
        >
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
        </Animated.View>

        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
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
              colors={["#1C1B1F", "#3A3A3F", "#1C1B1F"]}
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
        </Animated.View>
      </View>
    </View>
  );
};
