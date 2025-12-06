import { View, Pressable, Platform } from "react-native";

import { Colors } from "@/constants/ui";

import { styles } from "./styles";
import { Shadow } from "../../shadow";
import { Text } from "react-native-paper";
import { BackArrow } from "../../BackArrow/header";

type Item = {
  slug: string;
  label: string;
};

type InlineSwitch = {
  items: Item[];
  selectedColor: string;
  onChange: (slug: string) => void;
  value: string;
  bgColor?: string;
  shadowColor?: string;
};

export const InlineSwitch = ({
  items = [],
  selectedColor,
  value,
  bgColor,
  onChange,
  shadowColor,
}: InlineSwitch) => (
  <Shadow shadowColor={shadowColor}>
    <View style={[styles.container, bgColor && { backgroundColor: bgColor }]}>
      <BackArrow
        left={0}
        customStyles={{ position: "relative", marginLeft: 8 }}
      />
      {Platform.OS === "android" && <View style={styles.hideTopShadow} />}
      <View style={styles.switch}>
        {items.map(({ slug, label }) => (
          <Pressable
            key={slug}
            style={[
              styles.item,
              slug === value && { backgroundColor: selectedColor },
            ]}
            onPress={() => onChange(slug)}
          >
            <Text
              style={[styles.label, slug === value && { color: Colors.white }]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  </Shadow>
);
