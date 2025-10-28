import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/ui";
import { PopupMenu } from "@/src/components/popup";

import { styles } from "../styles/header";
import { BrandsList } from "../../utils/constants";

type HeaderFilterProps = {
  setShowFilterModal: (value: boolean) => void;
  toggleBrand: (id: string) => void;
  showReset: boolean;
  onReset: VoidCallback;
};

export const HeaderFilter = (props: HeaderFilterProps) => {
  const { setShowFilterModal, toggleBrand, showReset, onReset } = props;

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.filterContainer}>
        {showReset && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => onReset()}
            activeOpacity={0.8}
          >
            <Text style={{ color: Colors.mrDBlue, fontWeight: "600" }}>
              Reset
            </Text>
            {/* <MaterialIcons name="refresh" size={18} color={Colors.mrDBlue} /> */}
          </TouchableOpacity>
        )}

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
    </View>
  );
};
