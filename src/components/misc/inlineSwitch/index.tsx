import { View, Text, Pressable } from "react-native";

import { styles } from "./styles";
// import type { Colors } from "@src/types/ui";
import { Colors } from "@constants/ui";

type Item = {
  slug: string;
  label: string;
};

type InlineSwitch = {
  items: Item[];
  selectedColor: Colors;
  onChange: (slug: string) => void;
  value: string;
};

export const InlineSwitch = ({
  items = [],
  selectedColor,
  value,
  onChange
}: InlineSwitch) => (
  <View style={styles.switch}>
    {items.map(({ slug, label }) => (
      <Pressable
        key={slug}
        style={[
          styles.item,
          slug === value && { backgroundColor: selectedColor }
        ]}
        onPress={() => onChange(slug)}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    ))}
  </View>
);
