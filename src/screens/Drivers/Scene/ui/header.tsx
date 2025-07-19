import { View, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import { TextLogo } from "@components/misc/textLogo";
import { Colors } from "@constants/ui";
import { Circle } from "@components/shapes/circle";

import { styles } from "../styles/header";

export const Header = () => {
  return (
    <View
      style={[styles.container, Platform.OS === "ios" && { paddingTop: 0 }]}
    >
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.white }}>
        <View style={styles.items}>
          <TextLogo size="small" />
          <View style={styles.inputWrapper}>
            <EvilIcons name="search" size={20} color="black" />
            <TextInput
              onChangeText={() => {}}
              style={styles.textInput}
              placeholder="Search drivers..."
              placeholderTextColor={Colors.mediumGrey}
              cursorColor={Colors.darkUiBlue}
              textAlignVertical="center"
              underlineColorAndroid="transparent"
              maxLength={50}
              keyboardType="web-search"
              enablesReturnKeyAutomatically
              autoComplete="off"
              returnKeyType="search"
              spellCheck={false}
              autoCapitalize="none"
            />
          </View>

          <Circle size={35} borderColor={Colors.mrDBlue}>
            <Ionicons name="filter-outline" size={20} color={Colors.mrDBlue} />
          </Circle>
        </View>
      </SafeAreaView>
    </View>
  );
};
