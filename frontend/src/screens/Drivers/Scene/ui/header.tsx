import { View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import { TextLogo } from "@/src/components/misc/textLogo";
import { Colors } from "@/constants/ui";
import { Circle } from "@/src/components/shapes/circle";

import { styles } from "../styles/header";

type HeaderProps = {
  setSearchTerm: (value: string) => void;
  setShowFilterModal: (value: boolean) => void;
};

export const Header = (props: HeaderProps) => {
  const { setSearchTerm, setShowFilterModal } = props;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.white }}>
        <View style={styles.items}>
          <TextLogo size="small" />
          <View style={styles.inputWrapper}>
            <EvilIcons name="search" size={20} color="black" />
            <TextInput
              onChangeText={setSearchTerm}
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

          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Circle size={33} borderColor={Colors.mrDBlue}>
              <Ionicons
                name="filter-outline"
                size={20}
                color={Colors.mrDBlue}
              />
            </Circle>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
