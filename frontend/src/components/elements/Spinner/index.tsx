import { View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Colors } from "@/constants/ui";

type SpinnerProps = {
  size?: "small" | "large" | number;
  customStyles?: ViewStyle;
};

export const Spinner = (props: SpinnerProps) => {
  const { size = "large", customStyles } = props;

  return (
    <View
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        customStyles,
      ]}
    >
      <ActivityIndicator size={size} color={Colors.mrDBlue} />
    </View>
  );
};
