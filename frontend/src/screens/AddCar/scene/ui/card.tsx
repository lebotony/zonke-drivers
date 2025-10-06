import React, { useState } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { Text } from "react-native-paper";

import { Colors } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/card";

type CardProps = {
  card: {
    label: string;
    icon: React.JSX.Element;
    placeholder?: string;
  };
};

export const Card = (props: CardProps) => {
  const { card } = props;
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [checked, setChecked] = useState(false);

  const isManualOrDieselField =
    card.label === "Manual" || card.label === "Diesel";

  return (
    <View style={styles.card}>
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
          {isManualOrDieselField && checked
            ? "yes"
            : isManualOrDieselField && !checked
              ? "no"
              : card.placeholder}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setDisplayDropdown(!displayDropdown)}
        style={styles.dropdowmIconWrapper}
      >
        {isManualOrDieselField ? (
          <Switch
            value={checked}
            onValueChange={() => setChecked(!checked)}
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
      </TouchableOpacity>
    </View>
  );
};
