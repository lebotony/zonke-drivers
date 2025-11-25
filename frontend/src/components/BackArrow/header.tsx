import { Platform, View, ViewStyle, StyleSheet } from "react-native";

import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/src/../constants/ui";

type BackArrow = {
  customStyles?: ViewStyle;
  left?: number;
};

export const BackArrow = (props: BackArrow) => {
  const { customStyles, left = 7 } = props;

  return (
    <View style={[styles.row, customStyles, { left: left }]}>
      <CustomButton color={Colors.whiteSmoke} onPress={() => router.back()}>
        <MaterialIcons
          name={Platform.OS === "ios" ? "arrow-back-ios-new" : "arrow-back"}
          size={24}
          color={Colors.black}
        />
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
});
