import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@components/elements/button";
import { Colors } from "@/constants/ui";

import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/quickFilters";

export const PLATFORM_FILTERS = [
  {
    value: "bike",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome name="motorcycle" size={22} color="white" />
  },
  {
    value: "passenger",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <Ionicons name="car-sport-outline" size={24} color="white" />
  },
  {
    value: "taxi",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <MaterialCommunityIcons name="bus-side" size={24} color="white" />
  },
  {
    value: "truck",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <Fontisto name="truck" size={20} color="white" />
  },
  { value: "uber", slug: "Uber", bgColor: Colors.black, color: Colors.white },
  {
    value: "bolt",
    slug: "Bolt",
    bgColor: Colors.boltGreen,
    color: Colors.white
  },
  {
    value: "uber_eats",
    slug: "Uber Eats",
    bgColor: Colors.uberEatsGreen,
    color: Colors.white
  },
  {
    value: "checkers",
    slug: "CheckersSixty60",
    color: Colors.white,
    bgColor: Colors.checkers60Green
  },
  {
    value: "mr_d_food",
    slug: "Mr D Food",
    color: Colors.black,
    bgColor: Colors.mrDBlue
  }
];

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
