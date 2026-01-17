import React, { useEffect, useState } from "react";
import { View, Switch } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import { isIOS } from "@/src/helpers/platform";

import { styles } from "../styles/card";
import { PopupMenu } from "@/src/components/popup";
import { isEmpty } from "lodash";

type CardProps = {
  card: {
    name: string;
    label: string;
    icon: React.JSX.Element;
    placeholder?: string;
    options?: string[];
  };
  setValue: any;
  watch: any;
};

export const Card = (props: CardProps) => {
  const { card, setValue, watch } = props;
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [checked, setChecked] = useState(!watch("manual") || false);

  const isTransmission = card.label === "Transmission";

  const handleSetValue = (value: string) => {
    setValue(card?.name, value.toLowerCase(), { shouldValidate: true });
  };

  useEffect(() => {
    if (isTransmission) {
      // Manual = true, Automatic = false
      setValue(card.name, checked ? false : true, { shouldValidate: true });
    }
  }, [checked]);

  const getDisplayValue = () => {
    if (isTransmission) {
      return checked ? "Automatic" : "Manual";
    }

    const watchedValue = watch(card.name);
    return !isEmpty(watchedValue) ? watchedValue : null;
  };

  const onDropdownPress = () => {
    setDisplayDropdown(!displayDropdown);

    if (isTransmission) {
      setChecked(!checked);
    }
  };

  const displayValue = getDisplayValue();
  const hasValue = !isEmpty(displayValue);

  return (
    <PopupMenu
      onSelect={handleSetValue}
      options={card.options || []}
      innerBtnFn={onDropdownPress}
      style={styles.card}
    >
      <View style={styles.iconWrapper}>{card.icon}</View>
      <View style={styles.contentWrapper}>
        <Text style={styles.label}>{card.label}</Text>
        <Text style={hasValue ? styles.valueText : styles.placeholderText}>
          {hasValue ? displayValue : card.placeholder || "Select option"}
        </Text>
      </View>

      {isTransmission ? (
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => setChecked(!checked)}
            value={checked}
            trackColor={{ false: Colors.lighterGrey, true: Colors.mrDBlue }}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.lighterGrey}
            style={isIOS ? { transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] } : undefined}
          />
        </View>
      ) : (
        <View style={styles.dropdownIconWrapper}>
          <Ionicons
            name={displayDropdown ? "chevron-up" : "chevron-down"}
            color={Colors.mrDBlue}
            size={16}
          />
        </View>
      )}
    </PopupMenu>
  );
};
