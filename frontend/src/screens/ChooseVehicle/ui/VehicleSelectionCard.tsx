import React from "react";
import { Text } from "react-native-paper";
import { View, TouchableOpacity, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";
import { Colors } from "@/constants/ui";

import { styles } from "../styles/card";

type Props = {
  vehicle: Vehicle;
  isLast?: boolean;
  onSelect: () => void;
};

const VehicleTypeBadge = ({ type }: { type: string }) => {
  const getTypeConfig = () => {
    switch (type) {
      case "bike":
        return { icon: "motorbike", label: "Bike", color: Colors.primaryBlue };
      case "taxi":
        return { icon: "taxi", label: "Taxi", color: Colors.lightYellow };
      case "truck":
        return { icon: "truck", label: "Truck", color: Colors.lightRed };
      case "lorry":
        return { icon: "truck-cargo-container", label: "Lorry", color: Colors.slateGray };
      default:
        return { icon: "car-side", label: "Car", color: Colors.emeraldGreen };
    }
  };

  const config = getTypeConfig();

  return (
    <View style={styles.typeBadge}>
      <MaterialCommunityIcons name={config.icon as any} size={14} color={config.color} />
      <Text style={[styles.typeBadgeText, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

export const VehicleSelectionCard = ({ vehicle, isLast = false, onSelect }: Props) => {
  const hasCurrentDriver = vehicle?.vehicle_drivers && vehicle.vehicle_drivers.length > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.card, isLast && { marginBottom: 15 }]}
      onPress={onSelect}
    >
      <View style={styles.imageContainer}>
        <Image
          source={vehicle?.asset?.url}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {vehicle?.type && (
          <View style={styles.typeContainer}>
            <VehicleTypeBadge type={vehicle.type} />
          </View>
        )}

        {hasCurrentDriver && (
          <View style={styles.assignedBadge}>
            <Ionicons name="person" size={12} color={Colors.white} />
            <Text style={styles.assignedText}>Driver Assigned</Text>
          </View>
        )}
      </View>

      <View style={styles.contentSection}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.vehicleName} numberOfLines={1}>
              {capitalizeFirstLetter(vehicle?.brand)} {capitalizeFirstLetter(vehicle?.model)}
            </Text>
            <Text style={styles.yearText}>{vehicle?.model_year}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          {vehicle?.fuel_type && (
            <View style={styles.detailBadge}>
              <MaterialCommunityIcons name="gas-station" size={14} color={Colors.mediumGrey} />
              <Text style={styles.detailText}>{capitalizeFirstLetter(vehicle.fuel_type)}</Text>
            </View>
          )}

          {vehicle?.passengers && (
            <View style={styles.detailBadge}>
              <MaterialCommunityIcons name="seat-passenger" size={14} color={Colors.mediumGrey} />
              <Text style={styles.detailText}>{vehicle.passengers} seats</Text>
            </View>
          )}

          {vehicle?.manual !== undefined && (
            <View style={styles.detailBadge}>
              <MaterialCommunityIcons
                name={vehicle.manual ? "car-shift-pattern" : "car-cog"}
                size={14}
                color={Colors.mediumGrey}
              />
              <Text style={styles.detailText}>{vehicle.manual ? "Manual" : "Auto"}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>R{vehicle?.price_fixed?.value}</Text>
            <Text style={styles.priceLabel}>per day</Text>
          </View>

          <View style={styles.selectButton}>
            <Text style={styles.selectText}>Select Vehicle</Text>
            <Ionicons name="checkmark-circle" size={18} color={Colors.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
