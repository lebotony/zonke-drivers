import { Platform, View, ViewStyle } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { styles } from "../styles/header";
import { Colors } from "@/src/../constants/ui";

type HeaderProps = {
  customStyles?: ViewStyle;
};

export const Header = (props: HeaderProps) => {
  const { customStyles } = props;

  return (
    <View style={[styles.row, customStyles]}>
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
