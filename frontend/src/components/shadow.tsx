import { ReactNode } from "react";
import { View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../constants/ui";

type Shadow = {
  position?: "absolute" | "relative" | "static" | "fixed" | "sticky";
  bottom?: number;
  left?: number;
  right?: number;
  height?: number;
  zIndex?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  shadowColor?: string;
  children: ReactNode;
};

export const Shadow = (props: Shadow) => {
  const {
    position = "absolute",
    left = 0,
    right = 0,
    height = 4,
    zIndex = 0,
    borderBottomLeftRadius = 8,
    borderBottomRightRadius = 8,
    shadowColor = Colors.lighterGrey,
    children,
  } = props;

  return (
    <View style={{ position: "relative" }}>
      <LinearGradient
        colors={[shadowColor, "transparent"]}
        style={[
          { position: "relative" },
          typeof position === "string" && { position },
          typeof height === "number" && { bottom: -height },
          typeof left === "number" && { left },
          typeof right === "number" && { right },
          typeof height === "number" && { height },
          typeof zIndex === "number" && { zIndex },
          typeof borderBottomLeftRadius === "number" && {
            borderBottomLeftRadius,
          },
          typeof borderBottomRightRadius === "number" && {
            borderBottomRightRadius,
          },
        ]}
      />
      {children}
    </View>
  );
};
