import { View, Text } from "react-native";

import { styles } from "./styles";

type TextLogoProps = {
  size: "small" | "medium" | "large";
};

export const TextLogo = ({ size }: TextLogoProps) => (
  <View>
    <Text style={styles.topText}>ZONKE</Text>
    <Text style={styles.bottomText}>DRIVERS</Text>
  </View>
);
