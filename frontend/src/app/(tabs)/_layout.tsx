import React from "react";
import { Tabs } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

import { Colors } from "@/constants/ui";
import { useClientOnlyValue } from "../../components/useClientOnlyValue";

export default function TabLayout() {
  let driver = true;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.mrDBlue,
        tabBarInactiveTintColor: Colors.black,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
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
            <FontAwesome name="home"  size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="manage"
        options={{
          headerShown: false,
          title: "Manage",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          title: "Posts",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={21} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          headerShown: false,
          title: "Vehicle",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="commute" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={23} color={color} />
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
