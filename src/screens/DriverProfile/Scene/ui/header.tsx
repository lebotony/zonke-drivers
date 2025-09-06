import { Platform, View, Text, ViewStyle } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@components/elements/button";
import { styles } from "../styles/header";
import { Colors } from "@constants/ui";

type HeaderProps = {
  customStyles?: ViewStyle;
};

export const Header = (props: HeaderProps) => {
  const { customStyles } = props;

  return (
    <View style={[styles.row, customStyles]}>
      <CustomButton onPress={() => router.back()}>
        <MaterialIcons
          name={Platform.OS === "ios" ? "arrow-back-ios-new" : "arrow-back"}
          size={24}
          color={Colors.mrDBlue}
        />
      </CustomButton>
    </View>
  );
};
