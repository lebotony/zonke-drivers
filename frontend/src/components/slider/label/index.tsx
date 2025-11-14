import { View, Text } from "react-native";

import { styles } from "./styles";

export const Label = ({ text }: { text: string }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{text}</Text>
  </View>
);
