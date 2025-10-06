import React from "react";
import { ScrollView, View, ScrollViewProps, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { PLATFORM_FILTERS } from "../utils/constants";

import { styles } from "../styles/platforms";

type Platform = {
  value: string;
  color: string;
  bgColor: string;
  icon?: React.ReactNode;
  slug?: string;
  justIcon?: true;
};

type Platforms = {
  platforms: string[];
  customContainerStyle?: ViewStyle;
} & ScrollViewProps;

export const Platforms = (props: Platforms) => {
  const { platforms, customContainerStyle } = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="end"
      contentContainerStyle={[styles.platformTags, customContainerStyle]}
    >
      {platforms.map((platform, idx) => {
        const def = PLATFORM_FILTERS.find(({ value }) => value === platform);

        if (def) {
          return (
            <View
              key={`${platform} - ${idx}`}
              style={[
                styles.platform,
                def.justIcon && styles.justIconPlatform,
                { backgroundColor: def.bgColor },
              ]}
            >
              {def.icon && def.icon}
              {def.slug && (
                <Text style={[{ color: def.color }]}>{def.slug}</Text>
              )}
            </View>
          );
        }

        return null;
      })}
    </ScrollView>
  );
};
