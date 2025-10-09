import React from "react";
import { Tabs } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

import { Colors } from "@/constants/ui";
import { useClientOnlyValue } from "../../components/useClientOnlyValue";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  let user = 'driver';
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
      {user !== 'driver' && <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Drivers",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={28} color={color} />
          ),
        }}
      />}

      {user === 'driver' && <Tabs.Screen
        name="vehicles"
        options={{
          headerShown: false,
          title: "Vehicles",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={28} color={color} />
          ),
        }}
      />}

      <Tabs.Screen
        name="manage"
        options={{
          headerShown: false,
          title: "Manage",
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="motorbike" size={30} color={color} />
            <MaterialCommunityIcons name="steering" size={27} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          title: "Posts",
          tabBarIcon: (props) => (
            <AntDesign name="pluscircle" size={26} color={Colors.mrDBlue} />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          headerShown: false,
          title: "Vehicle",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="car" size={25} color={color} />
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
    </Tabs>
  );
}
