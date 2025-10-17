import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { Shadow } from "@/src/components/shadow";

import { styles } from "../styles/quickFilters";
import { PLATFORM_FILTERS } from "../utils/constants";

type QuickFiltersProps = {
  showReset: boolean;
  onSetSelectedPlatforms: (value: string) => void;
  selectedPlatforms: string[];
  onClear: VoidCallback;
  isVehicle?: boolean;
  setShowFilterModal: (value: boolean) => void;
};

export const QuickFilters = (props: QuickFiltersProps) => {
  const {
    showReset,
    onSetSelectedPlatforms,
    selectedPlatforms,
    onClear,
    isVehicle,
    setShowFilterModal,
  } = props;

  const WrapperElement = isVehicle ? View : Shadow;

  const platformFilters = isVehicle
    ? PLATFORM_FILTERS.slice(0, 5)
    : PLATFORM_FILTERS;

  return (
    <WrapperElement>
      <View
        style={[
          styles.container,
          isVehicle && { width: 252, justifyContent: "center" },
        ]}
      >
        {!isVehicle && (
          <View style={styles.titleWrapper}>
            <Text style={styles.heading}>
              {isVehicle ? "" : "Find by platform"}
            </Text>
            {showReset && (
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => onClear()}
                activeOpacity={0.8}
              >
                <Text style={{ color: Colors.mrDBlue, fontWeight: "600" }}>
                  Reset
                </Text>
                <MaterialIcons
                  name="refresh"
                  size={18}
                  color={Colors.mrDBlue}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setShowFilterModal(true)}
            >
              <Text style={{ fontWeight: "600", fontSize: 15, marginRight: 6 }}>
                Filter
              </Text>
              <Ionicons name="filter" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="end"
          contentContainerStyle={styles.platformFilter}
          bounces={false}
        >
          {platformFilters.map(
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
                {selectedPlatforms?.includes(value) && (
                  <View style={{ position: "absolute", top: -9, right: -10 }}>
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={Colors.emeraldGreen}
                    />
                  </View>
                )}
                {icon && icon}
                {slug && !justIcon && (
                  <Text style={[styles.platformText, { color }]}>{slug}</Text>
                )}
              </CustomButton>
            )
          )}
        </ScrollView>
      </View>
    </WrapperElement>
  );
};
