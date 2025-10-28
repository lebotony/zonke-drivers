import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Avatar } from "@/src/components/visual/avatar";
import { useCustomQuery } from "@/src/useQueryContext";

import { styles } from "../styles";
import { SettingsItems } from "./settingsItems";
import { settingsItemsDef } from "../../utils/settingsData";

export const Settings = () => {
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);

  const isProfilePicPresent = user?.asset?.url;

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
          <View
            style={[
              styles.avatarWrapper,
              isProfilePicPresent && { borderWidth: 0 },
            ]}
          >
            <Avatar
              source={isProfilePicPresent && user.asset.url}
              round
              width={60}
            />
            {!isProfilePicPresent && <Text style={styles.addText}>Add</Text>}
          </View>
          <View>
            <Text style={styles.userText}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={styles.descriptionText}>{user?.username}</Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            style={styles.forwardArrow}
          />
        </TouchableOpacity>

        <SettingsItems settings={settingsItemsDef.slice(0, 2)} />
        {/* <SettingsItems settings={settingsItemsDef.slice(3, 5)} /> */}
        <SettingsItems settings={settingsItemsDef.slice(-1)} />
      </ScrollView>
    </SafeAreaView>
  );
};
