import { View, FlatList, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import * as SimpleIcons from "simple-icons";

import { Colors } from "@/constants/ui";

import { styles } from "../styles/brands";

type BrandsProps = {
  selectedBrands: string[];
  toggleBrand: (id: string) => void;
  brands: Record<string, any>[];
};

export const Brands = (props: BrandsProps) => {
  const { selectedBrands, toggleBrand, brands } = props;

  return (
    <FlatList
      data={brands}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.brands}
      renderItem={({ item }) => {
        const iconData = (SimpleIcons as any)[item.icon];
        const isSelected = selectedBrands.includes(item.id);

        return (
          <TouchableOpacity
            style={[
              styles.chip,
              isSelected && {
                backgroundColor: Colors.mrDBlue,
                borderColor: Colors.mrDBlue,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => toggleBrand(item.id)}
          >
            <View style={styles.brandLogo}>
              {iconData ? (
                <Svg
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill={`#${iconData.hex}`}
                >
                  <Path d={iconData.path} />
                </Svg>
              ) : (
                <MaterialIcons name="directions-car" size={28} color="black" />
              )}
            </View>

            <Text
              style={[styles.chipText, isSelected && { color: Colors.white }]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
