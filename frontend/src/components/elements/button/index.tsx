import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";

import type { Colors as ColorsType } from "@src/types/ui";
import { Colors } from "../../../../constants/ui";

import { styles } from "./styles";

type CustomButtonProps = {
  type?: "normal";
  color?: ColorsType;
  haptics?: `${Haptics.ImpactFeedbackStyle}`;
  customStyle?: ViewStyle;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
} & TouchableOpacityProps;

export const CustomButton = (props: CustomButtonProps) => {
  const {
    haptics,
    color = "mrDBlue",
    children,
    onPress,
    customStyle,
    type = "normal",
    ...pressableProps
  } = props;

  const handleOnPress = (event: GestureResponderEvent) => {
    if (haptics) {
      Haptics.impactAsync(haptics as Haptics.ImpactFeedbackStyle);
    }
    onPress?.(event);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.basic,
        styles[type],
        color && { backgroundColor: Colors[color] || color },
        customStyle,
      ]}
      {...pressableProps}
      onPress={handleOnPress}
    >
      {children}
    </TouchableOpacity>
  );
};
