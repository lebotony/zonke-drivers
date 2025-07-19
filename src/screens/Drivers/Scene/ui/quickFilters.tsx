import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@components/elements/button";
import { Colors } from "@constants/ui";

import { styles } from "../styles/quickFilters";
import { PLATFORM_FILTERS } from "../utils/constants";

export const QuickFilters = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (value: string) => {
    if (selected?.includes(value)) {
      const updatedSelected = selected.filter((item) => item !== value);
      setSelected(updatedSelected);
    } else {
      setSelected((selected) => [...selected, value]);
    }
  };

  const onClear = () => {
    setSelected([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.heading}>Find by Platform</Text>
        {selected.length ? (
          <CustomButton onPress={onClear} customStyle={styles.clearButton}>
            <MaterialIcons name="clear" size={24} color={Colors.black} />
          </CustomButton>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="end"
        contentContainerStyle={styles.platformFilter}
        bounces={false}
      >
        {PLATFORM_FILTERS.map(({ value, bgColor, color, slug, icon }) => (
          <CustomButton
            key={value}
            haptics="light"
            color={bgColor}
            onPress={() => onSelect(value)}
            customStyle={{ paddingVertical: 5 }}
          >
            {selected.includes(value) && (
              <View style={{ position: "absolute", top: -9, right: -10 }}>
                <Ionicons name="checkmark-circle" size={24} color="green" />
              </View>
            )}
            {icon && icon}
            {slug && (
              <Text style={[styles.platformText, { color }]}>{slug}</Text>
            )}
          </CustomButton>
        ))}
      </ScrollView>
    </View>
  );
};
