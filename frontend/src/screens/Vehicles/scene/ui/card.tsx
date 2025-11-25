// ...existing code...
import React from "react";
import { Text } from "react-native-paper";
import { View, Pressable } from "react-native";

import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";

import { Colors } from "../../../../../constants/ui";
import { styles } from "../styles/card";

type Props = {
  vehicle: Vehicle;
  isLast?: boolean;
};

export const VehicleCard = ({ vehicle, isLast = false }: Props) => {
  return (
    <View style={[styles.card, isLast && { marginBottom: 15 }]}>
      <View style={styles.topSection}>
        <View style={styles.leftInfo}>
          <Text style={styles.carName}>
            {capitalizeFirstLetter(vehicle?.brand)}{" "}
            {capitalizeFirstLetter(vehicle?.model)}
          </Text>
          <View style={styles.priceContainer}>
            <Text
              style={styles.price}
            >{`R${vehicle?.price_fixed?.value}`}</Text>
            <Text style={styles.perDay}> per day</Text>
          </View>
        </View>

        <View style={styles.rightInfo}>
          <Pressable
            style={styles.iconWrapper}
            onPress={() => router.push(`/vehicles/${vehicle.id}`)}
          >
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </Pressable>

          {/* <View style={styles.rating}>
            <AntDesign name="star" size={18} color={Colors.lightYellow} />
            <Text style={styles.ratingValue}> {vehicle?.rating}</Text>
          </View> */}
        </View>
      </View>

      <Pressable
        style={styles.imgContainer}
        onPress={() => router.push(`/vehicles/${vehicle?.id}`)}
      >
        <Image
          source={vehicle?.asset?.url}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.leftFlap} />
        <View style={styles.rightFlap} />
      </Pressable>

      <View style={styles.footer}></View>
    </View>
  );
};
