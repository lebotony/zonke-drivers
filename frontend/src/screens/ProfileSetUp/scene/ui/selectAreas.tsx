import { View, TouchableOpacity } from "react-native";

import { isEmpty } from "lodash";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { PopupMenu } from "@/src/components/popup";
import { Colors } from "@/constants/ui";
import { styles } from "../styles/selectedArea";
import { PLATFORM_FILTERS } from "@/src/screens/Drivers/Scene/utils/constants";
import { CustomButton } from "@/src/components/elements/button";
import { Text } from "react-native-paper";

type SelectAreaProps = {
  options: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  selectedItems: string[];
  label: string;
};

export const SelectPlatformArea = (props: SelectAreaProps) => {
  const { options, onAddItem, selectedItems, onRemoveItem, label } = props;

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text>
          {label}{" "}
          <Text style={{ fontSize: 13, color: Colors.lightGrey }}>
            {" "}
            (optional)
          </Text>
        </Text>
        <PopupMenu onSelect={onAddItem} options={options}>
          <Text style={styles.selectText}>Select</Text>
        </PopupMenu>
      </View>
      <View style={styles.selected}>
        {isEmpty(selectedItems) ? (
          <Text style={{ color: Colors.mediumGrey, marginLeft: 10 }}>
            Select platforms...
          </Text>
        ) : (
          selectedItems.map((item, idx) => {
            const { value, bgColor, color, slug, icon, justIcon } =
              PLATFORM_FILTERS.filter((p) => p.value === item)[0];

            return (
              <CustomButton
                key={idx}
                haptics="light"
                color={bgColor}
                onPress={() => onRemoveItem(value)}
                customStyle={{
                  ...styles.platformButton,
                  width: justIcon ? 40 : "auto",
                }}
              >
                <View style={styles.closeIcon}>
                  <MaterialIcons
                    name="close"
                    size={15}
                    color={Colors.lightRed}
                  />
                </View>
                {icon && icon}
                {slug && !justIcon && (
                  <Text style={[styles.platformText, { color }]}>{slug}</Text>
                )}
              </CustomButton>
            );
          })
        )}
      </View>
    </View>
  );
};

export const SelectLicenceArea = (props: SelectAreaProps) => {
  const { options, onAddItem, selectedItems, onRemoveItem, label } = props;

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text>
          {label}{" "}
          <Text style={{ fontSize: 13, color: Colors.lightGrey }}>
            {" "}
            (optional)
          </Text>
        </Text>
        <PopupMenu onSelect={onAddItem} options={options}>
          <Text style={styles.selectText}>Select</Text>
        </PopupMenu>
      </View>
      <View style={styles.selected}>
        {isEmpty(selectedItems) ? (
          <Text style={{ color: Colors.mediumGrey, marginLeft: 10 }}>
            Select licences...
          </Text>
        ) : (
          selectedItems.map((item, idx) => (
            <View key={item + idx} style={styles.selectedItem}>
              <Text style={styles.selectedText}>{item}</Text>
              <TouchableOpacity onPress={() => onRemoveItem(item)}>
                <MaterialIcons name="close" size={15} color={Colors.lightRed} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </View>
  );
};
