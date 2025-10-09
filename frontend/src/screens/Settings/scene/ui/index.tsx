import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "@/src/components/visual/avatar";
import { useCustomQuery } from "@/src/useQueryContext";
import pic from "@/assets/images/person_1.jpg";

import { styles } from "../styles";
import { SettingsItems } from "./settingsItems";
import { settingsItemsDef } from "../../utils/settingsData";
import { router } from "expo-router";

export const Settings = () => {
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>Settings</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/profileSetup")}
          style={styles.userWrapper}
        >
          <Avatar source={pic} round width={55} />
          <View>
            <Text style={styles.userText}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={styles.descriptionText}>{user?.email}</Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            style={styles.forwardArrow}
          />
        </TouchableOpacity>

        <SettingsItems settings={settingsItemsDef.slice(0, 3)} />
        <SettingsItems settings={settingsItemsDef.slice(3, 5)} />
        <SettingsItems settings={settingsItemsDef.slice(-1)} />
      </ScrollView>
    </SafeAreaView>
  );
};
