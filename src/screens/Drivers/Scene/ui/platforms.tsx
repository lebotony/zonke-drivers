import React from "react";
import {
  ScrollView,
  View,
  Text,
  ScrollViewProps,
  ViewStyle,
} from "react-native";

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
  platforms: Platform[];
  customContainerStyle?: ViewStyle;
} & ScrollViewProps;

export const Platforms = ({ platforms, customContainerStyle }: Platforms) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="end"
      contentContainerStyle={[styles.platformTags, customContainerStyle]}
    >
      {["bike", "taxi", "uber_eats", "checkers"].map((platform, idx) => {
        const def = platforms.find(({ value }) => value === platform);

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
