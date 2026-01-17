import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { styles } from "../styles/resetFAB";

type ResetFABProps = {
  onPress: () => void;
  visible: boolean;
};

export const ResetFAB = ({ onPress, visible }: ResetFABProps) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.fabContent}>
        <MaterialIcons name="refresh" size={20} color={Colors.white} />
        <Text style={styles.fabText}>Reset</Text>
      </View>
    </TouchableOpacity>
  );
};
