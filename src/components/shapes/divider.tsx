import React from "react";
import { DimensionValue, View } from "react-native";

export const HorizontalDivider = ({ color }: { color: string }) => (
  <View style={{ borderTopWidth: 1, borderColor: color }} />
);

export const VerticalDivider = ({
  color,
  height = 16
}: {
  color: string;
  height: DimensionValue;
}) => <View style={{ borderLeftWidth: 1, borderColor: color, height }} />;
