import { View, Text, ScrollView } from "react-native";
import React from "react";
import { CustomButton } from "@/src/components/elements/button";
import { styles } from "../styles/platforms";
import { PLATFORM_FILTERS } from "@/src/screens/Drivers/Scene/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/ui";

type PlatformsProps = {
  onSetSelectedPlatforms: (value: string) => void;
  selectedPlatforms: string[];
};

export const HeaderFilterPlatforms = (props: PlatformsProps) => {
  const { selectedPlatforms, onSetSelectedPlatforms } = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="end"
      contentContainerStyle={[styles.platformFilter]}
      bounces={false}
    >
      {PLATFORM_FILTERS.slice(0, 5).map(
        ({ value, bgColor, color, slug, icon, justIcon }) => (
          <CustomButton
            key={value}
            haptics="light"
            color={bgColor}
            onPress={() => onSetSelectedPlatforms(value)}
            customStyle={{
              ...styles.platformButton,
              width: justIcon ? 40 : "auto",
            }}
          >
            {selectedPlatforms?.includes(value) && (
              <View
                style={{
                  position: "absolute",
                  top: -9,
                  right: -10,
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={Colors.emeraldGreen}
                />
              </View>
            )}
            {icon && icon}
            {slug && !justIcon && (
              <Text style={[styles.platformText, { color }]}>{slug}</Text>
            )}
          </CustomButton>
        ),
      )}
    </ScrollView>
  );
};
