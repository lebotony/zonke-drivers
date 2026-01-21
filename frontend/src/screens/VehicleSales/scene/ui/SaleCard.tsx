import React from "react";
import { Text } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";

import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";
import { Colors } from "../../../../../constants/ui";
import { styles } from "../styles/saleCard";

type Props = {
  vehicle: Vehicle;
  isLast?: boolean;
  onExpressInterest?: () => void;
  onViewDetails?: (vehicle: Vehicle) => void;
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
        return {
          icon: "truck-cargo-container",
          label: "Lorry",
          color: Colors.slateGray,
        };
      default:
        return { icon: "car-side", label: "Car", color: Colors.emeraldGreen };
    }
  };

  const config = getTypeConfig();

  return (
    <View style={styles.typeBadge}>
      <MaterialCommunityIcons
        name={config.icon as any}
        size={14}
        color={config.color}
      />
      <Text style={[styles.typeBadgeText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

export const SaleCard = ({
  vehicle,
  isLast = false,
  onExpressInterest,
  onViewDetails,
}: Props) => {
  const locationText = [
    vehicle?.user?.location?.city,
    vehicle?.user?.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const salePrice = vehicle?.sale_price?.value;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={[styles.card, isLast && { marginBottom: 15 }]}
      onPress={() => onViewDetails?.(vehicle)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={vehicle?.asset?.url}
          style={styles.image}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          recyclingKey={vehicle?.id}
        />

        {vehicle?.rating > 0 && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={Colors.lightYellow} />
            <Text style={styles.ratingText}>{vehicle.rating.toFixed(1)}</Text>
          </View>
        )}

        <View style={styles.saleBadge}>
          <MaterialCommunityIcons
            name="tag-multiple"
            size={14}
            color={Colors.white}
          />
          <Text style={styles.saleBadgeText}>FOR SALE</Text>
        </View>

        {vehicle?.type && (
          <View style={styles.typeContainer}>
            <VehicleTypeBadge type={vehicle.type} />
          </View>
        )}
      </View>

      <View style={styles.contentSection}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.vehicleName} numberOfLines={1}>
              {capitalizeFirstLetter(vehicle?.brand)}{" "}
              {capitalizeFirstLetter(vehicle?.model)}
            </Text>
            <Text style={styles.yearText}>{vehicle?.model_year}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          {vehicle?.fuel_type && (
            <View style={styles.detailBadge}>
              <MaterialCommunityIcons
                name="gas-station"
                size={14}
                color={Colors.mediumGrey}
              />
              <Text style={styles.detailText}>
                {capitalizeFirstLetter(vehicle.fuel_type)}
              </Text>
            </View>
          )}

          {vehicle?.passengers && (
            <View style={styles.detailBadge}>
              <MaterialCommunityIcons
                name="seat-passenger"
                size={14}
                color={Colors.mediumGrey}
              />
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
              <Text style={styles.detailText}>
                {vehicle.manual ? "Manual" : "Auto"}
              </Text>
            </View>
          )}
        </View>

        {locationText && (
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.mediumGrey}
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {locationText}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>R{salePrice}</Text>
            <Text style={styles.priceLabel}>sale price</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.ctaButton}
            onPress={() => onViewDetails?.(vehicle)}
          >
            <Text style={styles.ctaText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
