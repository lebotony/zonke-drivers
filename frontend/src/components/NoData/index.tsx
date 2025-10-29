import { View } from "react-native";
import { Text } from "react-native-paper";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

type NoDataProps = {
  messages?: boolean;
};

export const NoData = (props: NoDataProps) => {
  const { messages = false } = props;

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {messages ? (
        <Ionicons
          name="chatbubbles-outline"
          size={60}
          color={Colors.darkCharcoalGrey}
        />
      ) : (
        <MaterialCommunityIcons
          name="cloud-off-outline"
          size={70}
          color={Colors.darkCharcoalGrey}
        />
      )}
      <Text
        style={{ color: Colors.darkCharcoalGrey, marginTop: 10, fontSize: 20 }}
      >
        {messages ? "No chats available" : "No data available"}
      </Text>
    </View>
  );
};
