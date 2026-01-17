import { View, StyleSheet, Animated } from "react-native";
import { Text } from "react-native-paper";
import { ReactNode } from "react";
import { Colors } from "@/constants/ui";

type SettingsSectionProps = {
  title?: string;
  children: ReactNode;
  style?: any;
};

export const SettingsSection = ({ title, children, style }: SettingsSectionProps) => {
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.card}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: Colors.mediumGrey,
    marginBottom: 12,
    marginLeft: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: "hidden",
    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    // Android shadow
    elevation: 2,
  },
});
