import { View } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/ui";
import { PopupMenu } from "@/src/components/popup";

import { styles } from "../styles/header";
import { BrandsList } from "../../utils/constants";

type HeaderFilterProps = {
  setShowFilterModal: (value: boolean) => void;
  toggleBrand: (id: string) => void;
};

export const HeaderFilter = (props: HeaderFilterProps) => {
  const { toggleBrand } = props;

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.filterContainer}>
        <PopupMenu
          options={BrandsList.map((c) => c.label)}
          selectedValue={null}
          onSelect={(label) => {
            const found = BrandsList.find((c) => c.label === label);
            if (found) toggleBrand(found.id);
          }}
          iconColor={Colors.mediumDarkGrey}
        >
          <View style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all</Text>
          </View>
        </PopupMenu>
      </View>
    </View>
  );
};
