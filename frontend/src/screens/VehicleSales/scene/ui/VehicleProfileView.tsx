import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";
import { Colors } from "@/constants/ui";
import { Avatar } from "@/src/components/visual/avatar";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { CustomToast } from "@/src/components/CustomToast";
import { useAuth } from "@/src/authContext";

import { styles } from "./styles/vehicleProfileView";
import { expressPurchaseInterest } from "../../actions";
import { SimpleAuthModal } from "./SimpleAuthModal";

const SpecCard = ({ icon, title, value }: { icon: string; title: string; value: string | number }) => (
  <View style={styles.specCard}>
    <View style={styles.specIconContainer}>
      <MaterialCommunityIcons name={icon as any} size={22} color={Colors.mrDBlue} />
    </View>
    <Text style={styles.specTitle}>{title}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

type VehicleProfileViewProps = {
  vehicle: Vehicle;
  onClose: () => void;
  onNavigateToAuth: () => void;
};

export const VehicleProfileView = ({ vehicle, onClose, onNavigateToAuth }: VehicleProfileViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { authState, setPendingVehicleId } = useAuth();
  const width = Dimensions.get("window").width;

  const handleExpressInterest = () => {
    if (!authState?.authenticated) {
      setPendingVehicleId?.(vehicle.id);
      setShowAuthModal(true);
      return;
    }

    expressPurchaseInterest(vehicle.id)
      .then((response) => {
        console.log("Express interest response:", response);
        AppToast(response.message || "Interest registered successfully", true);
      })
      .catch((err) => {
        console.error("Express interest error:", err);
        AppToast("Failed to register interest");
      });
  };

  const locationText = [vehicle?.user?.location?.city, vehicle?.user?.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Section with Immersive Design */}
        <View style={styles.heroContainer}>
          <Image
            source={vehicle?.asset?.url}
            style={[styles.hero, { width }]}
            contentFit="cover"
            transition={300}
          />

          {/* Sophisticated Gradient Overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.75)']}
            locations={[0, 0.5, 1]}
            style={styles.heroGradient}
          />

          {/* Header Actions - Glassmorphic Style */}
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.headerRightActions}>
              <TouchableOpacity
                onPress={() => setExpanded(true)}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <Ionicons name="expand" size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Section with Modern Card Design */}
        <View style={styles.contentContainer}>
          {/* Title Section - Enhanced Hierarchy */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <View style={styles.titleContent}>
                <Text style={styles.vehicleTitle}>
                  {capitalizeFirstLetter(vehicle?.brand)} {capitalizeFirstLetter(vehicle?.model)}
                </Text>
                {vehicle?.model_year && (
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearBadgeText}>{vehicle.model_year}</Text>
                  </View>
                )}
              </View>

              {/* Premium Price Display - Sale Price */}
              {vehicle?.sale_price?.value && (
                <View style={styles.priceTag}>
                  <Text style={styles.priceValue}>R{vehicle.sale_price.value}</Text>
                  <Text style={styles.priceLabel}>sale price</Text>
                </View>
              )}
            </View>

            {/* Metadata Row with Icons */}
            <View style={styles.metadataRow}>
              {locationText && (
                <View style={styles.metadataItem}>
                  <View style={styles.metadataIconContainer}>
                    <Ionicons name="location-sharp" size={14} color={Colors.mrDBlue} />
                  </View>
                  <Text style={styles.metadataText} numberOfLines={1}>{locationText}</Text>
                </View>
              )}

              {vehicle?.rating > 0 && (
                <View style={styles.metadataItem}>
                  <View style={styles.metadataIconContainer}>
                    <Ionicons name="star" size={14} color={Colors.lightYellow} />
                  </View>
                  <Text style={styles.metadataText}>{vehicle.rating.toFixed(1)} Rating</Text>
                </View>
              )}
            </View>

            {/* Owner Card - Elevated Design */}
            <View style={styles.ownerCard}>
              <Avatar round width={44} source={vehicle?.user?.asset?.url} />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerLabel}>Owner</Text>
                <Text style={styles.ownerName} numberOfLines={1}>
                  {vehicle?.user?.first_name} {vehicle?.user?.last_name}
                </Text>
              </View>
            </View>
          </View>

          {/* Description Card */}
          {vehicle?.description && (
            <View style={styles.descriptionCard}>
              <Text style={styles.sectionTitle}>About this vehicle</Text>
              <Text
                style={styles.descriptionText}
                numberOfLines={isDescriptionExpanded ? undefined : 3}
              >
                {vehicle.description}
              </Text>
              {vehicle.description.length > 120 && (
                <TouchableOpacity
                  onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  style={styles.readMoreButton}
                >
                  <Text style={styles.readMoreText}>
                    {isDescriptionExpanded ? "Show less" : "Read more"}
                  </Text>
                  <Ionicons
                    name={isDescriptionExpanded ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={Colors.mrDBlue}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Specifications Section - Grid Layout */}
          <View style={styles.specsSection}>
            <Text style={styles.sectionTitle}>Key Specifications</Text>
            <View style={styles.specsGrid}>
              <SpecCard
                icon="gas-station"
                title="Fuel Type"
                value={capitalizeFirstLetter(vehicle?.fuel_type || "N/A")}
              />
              <SpecCard
                icon="car-seat"
                title="Passengers"
                value={vehicle?.passengers || "N/A"}
              />
              <SpecCard
                icon={vehicle?.manual ? "car-shift-pattern" : "car-cog"}
                title="Transmission"
                value={vehicle?.manual ? "Manual" : "Auto"}
              />
              <SpecCard
                icon="speedometer"
                title="Mileage"
                value={vehicle?.mileage ? `${vehicle.mileage}km` : "N/A"}
              />
              <SpecCard
                icon="engine"
                title="Engine"
                value={vehicle?.engine_capacity ? `${vehicle.engine_capacity}L` : "N/A"}
              />
              <SpecCard
                icon="car-info"
                title="Type"
                value={capitalizeFirstLetter(vehicle?.type || "N/A")}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Action Bar - Modern Button Design */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          onPress={handleExpressInterest}
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="tag-heart" size={18} color={Colors.white} />
          <Text style={styles.primaryButtonText}>Express Interest</Text>
        </TouchableOpacity>
      </View>

      {/* Fullscreen Image Modal */}
      {expanded && (
        <View style={styles.fullscreenModal}>
          <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
          <SafeAreaView style={styles.fullscreenContainer}>
            <TouchableOpacity
              onPress={() => setExpanded(false)}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={28} color={Colors.white} />
            </TouchableOpacity>

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <Image
                source={vehicle.asset?.url}
                style={{ width, height: "100%", resizeMode: "contain" }}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      <SimpleAuthModal
        visible={showAuthModal}
        onDismiss={() => setShowAuthModal(false)}
        onNavigateToAuth={onNavigateToAuth}
        action="express interest in buying this vehicle"
      />

      <Toast
        config={{
          customToast: (props) => <CustomToast {...props} />,
        }}
      />
    </View>
  );
};
