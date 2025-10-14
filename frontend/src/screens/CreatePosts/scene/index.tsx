import React from "react";
import { View } from "react-native";

import { Colors } from "@/constants/ui";

import { CreatePost } from "./ui";

export const CreatePostComponent = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <CreatePost />
    </View>
  );
};
