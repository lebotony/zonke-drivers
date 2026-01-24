import { View, TouchableOpacity, Animated } from "react-native";
import { useRef, useState } from "react";

import { find, isEmpty } from "lodash";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { SearchableLicenceModal } from "@/src/components/SearchableLicenceModal";
import { SearchablePlatformModal } from "@/src/components/SearchablePlatformModal";
import { Colors } from "@/constants/ui";
import { styles } from "../styles/selectedAreaModern";
import {
  LICENCES,
  PLATFORM_FILTERS,
} from "@/src/screens/Drivers/Scene/utils/constants";
import { CustomButton } from "@/src/components/elements/button";
import { Text } from "react-native-paper";

type SelectAreaProps = {
  options: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  selectedItems?: string[];
  label: string;
};

const AnimatedPlatformButton = ({
  item,
  onRemove,
}: {
  item: any;
  onRemove: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const { value, bgColor, color, slug, icon, justIcon } = item;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <CustomButton
        haptics="light"
        color={bgColor}
        onPress={onRemove}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        customStyle={{
          ...styles.platformButton,
          width: justIcon ? 48 : "auto",
        }}
      >
        <View style={styles.closeIcon}>
          <MaterialIcons name="close" size={14} color={Colors.lightRed} />
        </View>
        {icon && icon}
        {slug && !justIcon && (
          <Text style={[styles.platformText, { color }]}>{slug}</Text>
        )}
      </CustomButton>
    </Animated.View>
  );
};

const AnimatedLicenceChip = ({
  licence,
  onRemove,
}: {
  licence: string;
  onRemove: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onRemove}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.selectedItem}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>{licence}</Text>
        <MaterialIcons name="close" size={16} color={Colors.mrDBlue} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const SelectPlatformArea = (props: SelectAreaProps) => {
  const { onAddItem, selectedItems, onRemoveItem, label } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPlatform = (platformValue: string) => {
    onAddItem(platformValue);
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 600, color: Colors.darkCharcoalGrey }}>
          {label}{" "}
          <Text style={{ fontSize: 12, color: Colors.mediumGrey, fontWeight: 400 }}>
            (optional)
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.selectText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selected}>
        {isEmpty(selectedItems) ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add-circle-outline" size={18} color={Colors.mediumGrey} />
            <Text style={styles.emptyText}>
              Tap "Add" to select platforms
            </Text>
          </View>
        ) : (
          selectedItems?.map((item, idx) => {
            const platformData = PLATFORM_FILTERS.filter((p) => p.value === item)[0];

            return (
              <AnimatedPlatformButton
                key={idx}
                item={platformData}
                onRemove={() => onRemoveItem(platformData.value)}
              />
            );
          })
        )}
      </View>

      <SearchablePlatformModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSelect={handleAddPlatform}
        selectedItems={selectedItems}
      />
    </View>
  );
};

export const SelectLicenceArea = (props: SelectAreaProps) => {
  const { options, onAddItem, selectedItems, onRemoveItem, label } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddLicence = (licenceName: string) => {
    onAddItem(licenceName);
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 600, color: Colors.darkCharcoalGrey }}>
          {label}{" "}
          <Text style={{ fontSize: 12, color: Colors.mediumGrey, fontWeight: 400 }}>
            (optional)
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.selectText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selected}>
        {isEmpty(selectedItems) ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add-circle-outline" size={18} color={Colors.mediumGrey} />
            <Text style={styles.emptyText}>
              Tap "Add" to select licences
            </Text>
          </View>
        ) : (
          selectedItems?.map((item, idx) => {
            const licence = find(LICENCES, { slug: item })?.name;

            return (
              <AnimatedLicenceChip
                key={idx}
                licence={licence || item}
                onRemove={() => onRemoveItem(item)}
              />
            );
          })
        )}
      </View>

      <SearchableLicenceModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSelect={handleAddLicence}
        selectedItems={selectedItems}
      />
    </View>
  );
};
