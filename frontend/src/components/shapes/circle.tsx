import React from "react";
import { StyleSheet, View } from "react-native";

type CircleProps = {
  size: number;
  children: React.ReactNode;
  borderColor: string;
};
export const Circle = ({ size, children, borderColor }: CircleProps) => (
  <View style={[styles.circle, { width: size, borderColor }]}>{children}</View>
);

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1,
    borderRadius: "50%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});
