import { Colors } from "@/constants/ui";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type CustomToastProps = {
  text1?: string;
  text2?: string;
  props: { toastType: string };
};

export const CustomToast = ({ text1, text2, props }: CustomToastProps) => {
  const { toastType } = props;

  const isSuccess = toastType === "success";

  return (
    <View
      style={[
        {
          padding: 14,
          borderRadius: 10,
          marginHorizontal: 10,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 5,
        },
        isSuccess
          ? { backgroundColor: Colors.lightGreen }
          : { backgroundColor: Colors.lightRed },
      ]}
    >
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text
          style={{
            color: "white",
            maxWidth: "92%",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {text1}
        </Text>
        {isSuccess ? (
          <MaterialIcons name="check-circle" size={24} color="white" />
        ) : (
          <MaterialIcons name="error" size={24} color="white" />
        )}
      </View>
      {text2 ? (
        <Text style={{ color: "#ddd", fontSize: 15 }}>{text2}</Text>
      ) : null}
    </View>
  );
};
