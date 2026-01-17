import { Pressable, View, StyleSheet, Animated } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode, useRef } from "react";
import { Colors } from "@/constants/ui";

type SettingsItemProps = {
  icon: ReactNode;
  iconWrapperColor: string;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
  danger?: boolean;
  subtitle?: string;
};

export const SettingsItem = ({
  icon,
  iconWrapperColor,
  label,
  onPress,
  showDivider = true,
  danger = false,
  subtitle,
}: SettingsItemProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
          !showDivider && styles.noDivider,
        ]}
      >
        <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
          {icon}
        </View>

        <View style={styles.content}>
          <Text style={[styles.label, danger && styles.dangerLabel]}>
            {label}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <MaterialIcons
          name="arrow-forward-ios"
          size={18}
          color={Colors.mediumLightGrey}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteSmoke,
    backgroundColor: Colors.white,
  },
  pressed: {
    backgroundColor: Colors.bg,
  },
  noDivider: {
    borderBottomWidth: 0,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.darkCharcoalGrey,
    letterSpacing: 0.2,
  },
  dangerLabel: {
    color: Colors.lightRed,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.mediumGrey,
    marginTop: 2,
  },
});
