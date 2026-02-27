import { View, SafeAreaView, ScrollView, Pressable, Animated } from "react-native";
import { Text } from "react-native-paper";
import { useRef } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Avatar } from "@/src/components/visual/avatar";
import { useCustomQuery } from "@/src/useQueryContext";
import { useAuth } from "@/src/authContext";
import { Spinner } from "@/src/components/elements/Spinner";

import { styles } from "../styles";
import { SettingsSection } from "./SettingsSection";
import { SettingsItem } from "./SettingsItem";
import { settingsItemsDef } from "../../utils/settingsData";

export const Settings = () => {
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);
  const { onLogout } = useAuth();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (!user) return <Spinner />;

  const isProfilePicPresent = user?.asset?.url;
  const settings =
    user.role === "driver"
      ? settingsItemsDef.slice(0, 2)
      : settingsItemsDef.slice(1, 2);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const handleItemPress = (item: any) => {
    if (item.slug === "logout") {
      return onLogout!();
    }
    if (item.slug === "card") {
      return router.push("/previewCard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.header}>Settings</Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            onPress={() => router.push("/profileSetup")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({ pressed }) => [
              styles.profileCard,
              pressed && styles.profileCardPressed,
            ]}
          >
            <View style={styles.avatarContainer}>
              {isProfilePicPresent ? (
                <Avatar
                  source={user?.asset?.url}
                  round
                  width={68}
                  backgroundColor={false}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Avatar
                    source={false}
                    round
                    width={68}
                    backgroundColor={false}
                  />
                  <View style={styles.addBadge}>
                    <MaterialIcons name="add" size={16} color="white" />
                  </View>
                </View>
              )}
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {user?.first_name} {user?.last_name}
              </Text>
              <Text style={styles.userHandle}>@{user?.username}</Text>
            </View>

            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color="#C7C7CC"
            />
          </Pressable>
        </Animated.View>

        {settings.length > 0 && (
          <SettingsSection>
            {settings.map((item, index) => (
              <SettingsItem
                key={`${item.slug}-${index}`}
                icon={item.icon}
                iconWrapperColor={item.iconWrapperColor}
                label={item.label}
                onPress={() => handleItemPress(item)}
                showDivider={index !== settings.length - 1}
              />
            ))}
          </SettingsSection>
        )}

        <SettingsSection>
          {settingsItemsDef.slice(-1).map((item, index) => (
            <SettingsItem
              key={`${item.slug}-${index}`}
              icon={item.icon}
              iconWrapperColor={item.iconWrapperColor}
              label={item.label}
              onPress={() => handleItemPress(item)}
              showDivider={false}
              danger={item.slug === "logout"}
            />
          ))}
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};
