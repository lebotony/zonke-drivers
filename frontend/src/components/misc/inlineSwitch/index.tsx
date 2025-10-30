import { View, Text, Pressable, Platform } from 'react-native';

import { Colors } from '@/constants/ui';

import { styles } from './styles';
import { Shadow } from '../../shadow';

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
    <View style={[styles.switch, bgColor && { backgroundColor: bgColor }]}>

      {Platform.OS === 'android' && <View style={styles.hideTopShadow}/>}
      {items.map(({ slug, label }) => (
        <Pressable
          key={slug}
          style={[styles.item, slug === value && { backgroundColor: selectedColor }]}
          onPress={() => onChange(slug)}
        >
          <Text style={[styles.label, slug === value && { color: Colors.white }]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  </Shadow>
);
