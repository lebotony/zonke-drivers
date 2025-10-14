import React from "react";
import { View, Image as RNImage, Pressable } from "react-native";
import { Text } from "react-native-paper";

import carPic from "@/assets/images/car-test.jpg";
import carOwner from "@/assets/images/person_1.jpg";

import { styles } from "./styles";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/ui";

export const PostCard = () => {
  return (
    <View style={styles.container}>
      <RNImage source={carPic} style={styles.postPic} />

      <View style={styles.descriptionContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.name}>Toyota Camry 2020</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Ionicons name="location-sharp" size={18} color={Colors.mrDBlue}  />
            <Text style={styles.metaText}>Nketa Bulawayo</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 6 }}>
            <FontAwesome5 name="clock" size={16} color={Colors.mrDBlue} />
            <Text style={styles.metaText}>Posted 2hrs ago</Text>
          </View>

        </View>

        <Text style={styles.descriptionText}>
          Looking for a reliable driver for my Toyota Camry for taxi services. Must have valid driving license and at least 3 years experience. Car is well maintained and fuel efficient.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.owner}>
          <RNImage source={carOwner} style={styles.ownerPic} />
          <Text style={styles.ownerName}>James M.</Text>
        </View>

        <Pressable style={styles.applyBtn}>
          <Text style={styles.applyText}>Apply Now</Text>
        </Pressable>
      </View>
    </View>
  );
};