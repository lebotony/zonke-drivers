import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { Shadow } from "@/src/components/shadow";
import { useAuth } from "@/src/authContext";

import { styles } from "../styles/quickFilters";
import { PLATFORM_FILTERS } from "../utils/constants";

type QuickFiltersProps = {
  onSetSelectedPlatforms: (value: string) => void;
  selectedPlatforms: string[];
  onClear: VoidCallback;
};

export const QuickFilters = (props: QuickFiltersProps) => {
  const { onSetSelectedPlatforms, selectedPlatforms, onClear } = props;
  const { onLogout } = useAuth();

  return (
    <Shadow>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.heading}>Find by platform</Text>
          {selectedPlatforms.length ? (
            <CustomButton onPress={onClear} customStyle={styles.clearButton}>
              <MaterialIcons name="clear" size={24} color={Colors.black} />
            </CustomButton>
          ) : null}
          <Text
            style={{ color: Colors.lightRed, fontWeight: 700 }}
            onPress={onLogout}
          >
            Logout
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="end"
          contentContainerStyle={styles.platformFilter}
          bounces={false}
        >
          {PLATFORM_FILTERS.map(
            ({ value, bgColor, color, slug, icon, justIcon }) => (
              <CustomButton
                key={value}
                haptics="light"
                color={bgColor}
                onPress={() => onSetSelectedPlatforms(value)}
                customStyle={{
                  ...styles.platformButton,
                  width: justIcon ? 40 : "auto",
                }}
              >
                {selectedPlatforms.includes(value) && (
                  <View style={{ position: "absolute", top: -9, right: -10 }}>
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={Colors.emeraldGreen}
                    />
                  </View>
                )}
                {icon && icon}
                {slug && (
                  <Text style={[styles.platformText, { color }]}>{slug}</Text>
                )}
              </CustomButton>
            )
          )}
        </ScrollView>
      </View>
    </Shadow>
  );
};
