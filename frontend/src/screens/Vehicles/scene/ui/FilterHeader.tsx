import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { PopupMenu } from "@/src/components/popup";
import { useAuth } from "@/src/authContext";

import { styles } from "../styles/header";
import { BrandsList } from "../../utils/constants";

type HeaderFilterProps = {
  setShowFilterModal: (value: boolean) => void;
  selectedBrands: string[];
  setVisibleBrands: (value: string[]) => void;
  toggleBrand: (id: string) => void;
  showReset: boolean;
  onReset: VoidCallback;
};

export const HeaderFilter = (props: HeaderFilterProps) => {
  const {
    setShowFilterModal,
    selectedBrands,
    setVisibleBrands,
    toggleBrand,
    showReset,
    onReset,
  } = props;

  const { onLogout } = useAuth();

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={{ fontWeight: "600", fontSize: 15 }}>Filter</Text>
          <MaterialIcons
            name="filter-list"
            size={20}
            color={Colors.mediumDarkGrey}
          />
        </TouchableOpacity>

        {/* FOR PRODUCTION USE ONLY */}
        <TouchableOpacity onPress={onLogout}>
          <Text
            style={{
              color: Colors.lightRed,
              fontWeight: 600,
              marginHorizontal: 20,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        {/* FOR PRODUCTION USE ONLY */}

        {showReset && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              (onReset(),
                setVisibleBrands(BrandsList?.map((b) => b.id).slice(0, 5)));
            }}
            activeOpacity={0.8}
          >
            <Text style={{ color: Colors.mrDBlue, fontWeight: "600" }}>
              Reset
            </Text>
            <MaterialIcons name="refresh" size={18} color={Colors.mrDBlue} />
          </TouchableOpacity>
        )}
      </View>
      <PopupMenu
        options={BrandsList.map((c) => c.label)}
        selectedValue={null}
        onSelect={(label) => {
          const found = BrandsList.find((c) => c.label === label);
          if (found) toggleBrand(found.id);
        }}
        iconColor={Colors.mediumDarkGrey}
      >
        <Text style={styles.seeAll}>View all</Text>
      </PopupMenu>
    </View>
  );
};
