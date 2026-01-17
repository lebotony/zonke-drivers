import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

type NoDataProps = {
  messages?: boolean;
};

export const NoData = (props: NoDataProps) => {
  const { messages = false } = props;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {messages ? (
          <Ionicons
            name="chatbubbles-outline"
            size={64}
            color={Colors.mediumGrey}
          />
        ) : (
          <MaterialCommunityIcons
            name="cloud-off-outline"
            size={72}
            color={Colors.mediumGrey}
          />
        )}
      </View>
      <Text style={styles.title}>
        {messages ? "No conversations yet" : "No data available"}
      </Text>
      {messages && (
        <Text style={styles.subtitle}>
          Start a conversation to see your messages here
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.skyLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: Colors.darkCharcoalGrey,
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.mediumGrey,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
