import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

import { Colors } from "@/constants/ui";
import { useCustomQuery } from "@/src/useQueryContext";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Spinner } from "@/src/components/elements/Spinner";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TabLayout() {
  const headerShown = useClientOnlyValue(false, true);

  const { getCachedData } = useCustomQuery();
  const { user, threads } = getCachedData(["user", "threads"]);

  useEffect(() => {
    if (user && user.role === "driver" && user.onboarding_complete === false) {
      router.replace("/onboarding");
    }
  }, [user]);

  if (!user) {
    return <Spinner />;
  }

  const isDriver = user?.role === "driver";

  const unseen_msg_count = threads?.reduce(
    (sum: number, thread: Thread) => sum + thread?.unseen_msg_count,
    0,
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.mrDBlue,
        tabBarInactiveTintColor: Colors.black,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown,
        tabBarStyle: {
          backgroundColor: Colors.white,
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="manage"
        options={{
          headerShown: false,
          title: "Manage",
          href: isDriver ? null : "/(tabs)/manage",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          headerShown: false,
          title: "Vehicle",
          href: isDriver ? null : "/(tabs)/vehicle/new",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="commute" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="purchase"
        options={{
          headerShown: false,
          title: "Purchase",
          href: isDriver ? "/(tabs)/purchase" : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <Ionicons name="chatbubbles-outline" size={25} color={color} />
              {unseen_msg_count > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unseen_msg_count}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: Colors.lightRed,
    width: 15,
    height: 15,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: -3,
  },
  unreadBadgeText: {
    color: Colors.white,
    fontSize: 9,
  },
});
