import { Platform, View, Text } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { styles } from "../styles/header";
import { Colors } from "@/constants/ui";

export const Header = () => {
  return (
    <View style={styles.row}>
      <CustomButton onPress={() => router.back()}>
        <MaterialIcons
          name={Platform.OS === "ios" ? "arrow-back-ios-new" : "arrow-back"}
          size={24}
          color={Colors.mrDBlue}
        />
      </CustomButton>
      <Text style={styles.name}>Romeo makota</Text>
    </View>
  );
};
