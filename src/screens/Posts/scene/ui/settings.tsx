import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@constants/ui";
import { CustomButton } from "@components/elements/button";

import { styles } from "../styles/settings";
import { settingsData } from "../utils/settingsData";

export const PostSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>
      <Text style={styles.subTitle}>Who can see your posts?</Text>

      <View style={{ marginTop: 12 }}>
        {settingsData.map((item, idx) => (
          <TouchableOpacity
            style={styles.resultItem}
            // onPress={() => onSelect(item)}
            key={idx}
          >
            <View style={{ width: 30, marginRight: 5 }}>{item.icon}</View>
            <Text style={styles.resultText}>{item.text}</Text>
            <View
              style={[
                styles.checkedBox,
                item?.selected && {
                  backgroundColor: Colors.emeraldGreen,
                  borderColor: Colors.emeraldGreen,
                },
              ]}
            >
              <MaterialIcons
                name="check"
                size={16}
                color={item?.selected ? Colors.white : Colors.black}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        color="primaryBlue"
        haptics="light"
        onPress={() => null}
        customStyle={{ flexGrow: 1, marginBottom: 40, marginTop: 20 }}
      >
        <Text style={{ color: Colors.white, fontWeight: 700, fontSize: 17 }}>
          Next
        </Text>
      </CustomButton>
    </View>
  );
};
