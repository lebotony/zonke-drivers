import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

import { styles } from "../styles/service";

type ServiceProps = {
  item: any;
  onSelect: (item: any) => void;
  isSelected: (item: any) => boolean;
};

export const Service = (props: ServiceProps) => {
  const { item, onSelect, isSelected } = props;

  return (
    <TouchableOpacity
      style={[styles.resultItem, isSelected(item) && null]}
      onPress={() => onSelect(item)}
    >
      <Text style={styles.resultText}>{item.name}</Text>
      <View
        style={[
          styles.checkedBox,
          isSelected(item) && {
            backgroundColor: Colors.emeraldGreen,
            borderColor: Colors.emeraldGreen,
          },
        ]}
      >
        <MaterialIcons
          name="check"
          size={16}
          color={isSelected(item) ? Colors.white : Colors.black}
        />
      </View>
    </TouchableOpacity>
  );
};
