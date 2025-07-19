import React from "react";
import {
  ScrollView,
  View,
  Text,
  ScrollViewProps,
  ViewStyle
} from "react-native";

import { styles } from "../styles/platforms";

type Platform = {
  value: string;
  color: string;
  bgColor: string;
  icon?: React.ReactNode;
  slug?: string;
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
      {["bike", "uber_eats", "checkers"].map((platform) => {
        const def = platforms.find(({ value }) => value === platform);

        if (def) {
          return (
            <View style={[styles.platform, { backgroundColor: def.bgColor }]}>
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
