import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/src/../constants/ui";

type BackArrow = {
  customStyles?: ViewStyle;
  left?: number;
  top?: number;
};

export const BackArrow = (props: BackArrow) => {
  const { customStyles, left = 7, top = 0 } = props;

  return (
    <View style={[styles.row, { left: left, top: top }, customStyles]}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons
          name="arrow-back-ios-new"
          size={24}
          color={Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    zIndex: 10000,
  },
});
