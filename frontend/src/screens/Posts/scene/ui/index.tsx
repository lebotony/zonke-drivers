import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../../../../constants/ui";
import { Avatar } from "../../../../components/visual/avatar";
import profilePic from "@assets/images/profile_pic.png";

import { Form } from "./form";
import { PostSettings } from "./settings";
import { styles } from "../styles";

export const CreatePost = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={Colors.darkCharcoal}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Create Post</Text>
      </View>

      <View style={styles.profile}>
        <Avatar source={profilePic} round width={55} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            backgroundColor: Colors.softGrey,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Colors.dimGrey,
          }}
        >
          Kudakwashe Munyaradzi
        </Text>
      </View>

      <Form />

      <PostSettings />
    </ScrollView>
  );
};
