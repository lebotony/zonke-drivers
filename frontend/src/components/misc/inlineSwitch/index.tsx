import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";

import { styles } from "./styles";

type Item = {
  slug: string;
  label: string;
};

type InlineSwitch = {
  items: Item[];
  selectedColor: string;
  onChange: (slug: string) => void;
  value: string;
};

export const InlineSwitch = ({
  items = [],
  selectedColor,
  value,
  onChange,
}: InlineSwitch) => (
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
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    ))}
  </View>
);
