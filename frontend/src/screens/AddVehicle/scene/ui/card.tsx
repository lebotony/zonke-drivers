import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/card";
import { PopupMenu } from "@/src/components/popup";
import { isEmpty } from "lodash";

type CardProps = {
  card: {
    name: string;
    label: string;
    icon: React.JSX.Element;
    placeholder?: string;
    options: string[];
  };
  setValue: any;
  watch: any;
};

export const Card = (props: CardProps) => {
  const { card, setValue, watch } = props;
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [checked, setChecked] = useState(false);

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

  const getValues = () => {
    if (isTransmission) {
      return checked ? "Automatic" : "Manual";
    }

    const watchedValue = watch(card.name);
    return !isEmpty(watchedValue) ? watchedValue : card.placeholder;
  };

  const onDropdownPress = () => {
    setDisplayDropdown(!displayDropdown);

    if (isTransmission) {
      setChecked(!checked);
    }
  };

  return (
    <PopupMenu
      onSelect={handleSetValue}
      options={card.options}
      innerBtnFn={onDropdownPress}
      style={styles.card}
    >
      <View style={styles.iconWrapper}>{card.icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: 600 }}>{card.label}</Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: Colors.mediumGrey,
          }}
        >
          {getValues()}
        </Text>
      </View>

      <View style={styles.dropdowmIconWrapper}>
        {isTransmission ? (
          <Switch
            onValueChange={() => setChecked(!checked)}
            value={checked}
            trackColor={{ false: "#D3D3D3", true: Colors.tealGreen }}
            thumbColor={checked ? "#fff" : "#f4f3f4"}
          />
        ) : (
          <Ionicons
            name={!displayDropdown ? "chevron-down" : "chevron-up"}
            color={Colors.black}
            size={12}
            style={{ paddingTop: 1 }}
          />
        )}
      </View>
    </PopupMenu>
  );
};
