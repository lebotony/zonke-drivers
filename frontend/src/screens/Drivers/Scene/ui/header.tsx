import { View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { TextLogo } from "@/src/components/misc/textLogo";
import { Colors } from "@/constants/ui";

import { styles } from "../styles/header";

type HeaderProps = {
  setSearchTerm: (value: string) => void;
  setShowFilterModal: (value: boolean) => void;
  isVehicleList?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { setSearchTerm, setShowFilterModal, isVehicleList } = props;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.white }}>
        <View style={styles.items}>
          <View style={styles.logoWrapper}>
            <TextLogo size="small" />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.searchIconWrapper}>
              <Ionicons
                name="search-outline"
                size={20}
                color={Colors.mrDBlue}
              />
            </View>
            <TextInput
              onChangeText={setSearchTerm}
              style={styles.textInput}
              placeholder={`Search ${isVehicleList ? "vehicles" : "drivers"}...`}
              placeholderTextColor={Colors.mediumLightGrey}
              cursorColor={Colors.mrDBlue}
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

          <TouchableOpacity
            style={styles.filterButton}
            activeOpacity={0.8}
            onPress={() => setShowFilterModal(true)}
          >
            <LinearGradient
              colors={["#76CBED", "#90D7F5", "#ADE3F9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.filterButtonGradient}
            >
              <Ionicons
                name="options-outline"
                size={22}
                color={Colors.white}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
