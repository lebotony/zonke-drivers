import React, { useState, useRef } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash";
import { LinearGradient } from "expo-linear-gradient";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";
import { useCustomQuery } from "@/src/useQueryContext";
import { Colors } from "@/constants/ui";
import { Avatar } from "@/src/components/visual/avatar";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { useAuth } from "@/src/authContext";
import { AuthRequiredModal } from "@/src/components/AuthRequiredModal";

import { styles } from "./styles/index";
import { createThread } from "../../DriverProfile/actions";
import { applyForVehicle } from "../actions";
import { NoProfileModal } from "./noProfileModal";

const SpecCard = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string | number;
}) => (
  <View style={styles.specCard}>
    <View style={styles.specIconContainer}>
      <MaterialCommunityIcons
        name={icon as any}
        size={22}
        color={Colors.mrDBlue}
      />
    </View>
    <Text style={styles.specTitle}>{title}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

export const Scene = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const [expanded, setExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showNoProfileModal, setShowNoProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState("");

  const { authState } = useAuth();
  const { addItemToPaginatedList } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { vehicles, threads = [] } = getCachedData(["vehicles", "threads"]);
  const vehicle: Vehicle = find(vehicles, { id: vehicleId });

  const width = Dimensions.get("window").width;
  const modalRef = useRef<any>(null);

  const handleCreateThread = () => {
    if (!authState?.authenticated) {
      setAuthAction("message the owner");
      setShowAuthModal(true);
      return;
    }

    createThread({ participant_id: vehicle.user.id })
      .then((response) => {
        if (!find(threads, { id: response.id })) {
          addItemToPaginatedList("threads", response);
        }
        router.push(`/chats/${response.id}`);
      })
      .catch((err) => err);
  };

  const handleApply = () => {
    if (!authState?.authenticated) {
      setAuthAction("apply to drive this vehicle");
      setShowAuthModal(true);
      return;
    }

    applyForVehicle({ vehicle_id: vehicleId })
      .then(() => {
        AppToast("Application sent successfully", true);
      })
      .catch((err) => {
        const errorKey = err.response?.data?.error;

        if (errorKey === "application_exists") {
          return AppToast("Application already exists", true);
        }

        if (errorKey === "no_driver_profile") {
          setShowNoProfileModal(true);
        } else {
          AppToast();
          throw new Error("Application error:", err);
        }
      });
  };

  const locationText = [
    vehicle?.user?.location?.city,
    vehicle?.user?.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
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
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.75)"]}
            locations={[0, 0.5, 1]}
            style={styles.heroGradient}
          />

          {/* Header Actions - Glassmorphic Style */}
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => router.back()}
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
                  {capitalizeFirstLetter(vehicle?.brand)}{" "}
                  {capitalizeFirstLetter(vehicle?.model)}
                </Text>
                {vehicle?.model_year && (
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearBadgeText}>
                      {vehicle.model_year}
                    </Text>
                  </View>
                )}
              </View>

              {/* Premium Price Display */}
              {vehicle?.price_fixed?.value && (
                <View style={styles.priceTag}>
                  <Text style={styles.priceValue}>
                    R{vehicle.price_fixed.value}
                  </Text>
                  <Text style={styles.priceLabel}>per day</Text>
                </View>
              )}
            </View>

            {/* Metadata Row with Icons */}
            <View style={styles.metadataRow}>
              {locationText && (
                <View style={styles.metadataItem}>
                  <View style={styles.metadataIconContainer}>
                    <Ionicons
                      name="location-sharp"
                      size={14}
                      color={Colors.mrDBlue}
                    />
                  </View>
                  <Text style={styles.metadataText} numberOfLines={1}>
                    {locationText}
                  </Text>
                </View>
              )}

              {vehicle?.rating > 0 && (
                <View style={styles.metadataItem}>
                  <View style={styles.metadataIconContainer}>
                    <Ionicons
                      name="star"
                      size={14}
                      color={Colors.lightYellow}
                    />
                  </View>
                  <Text style={styles.metadataText}>
                    {vehicle.rating.toFixed(1)} Rating
                  </Text>
                </View>
              )}
            </View>

            {/* Owner Card - Elevated Design */}
            <TouchableOpacity
              style={styles.ownerCard}
              onPress={() => router.push(`/drivers/${vehicle?.user?.id}`)}
              activeOpacity={0.8}
            >
              <Avatar round width={44} source={vehicle?.user?.asset?.url} />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerLabel}>Owner</Text>
                <Text style={styles.ownerName} numberOfLines={1}>
                  {vehicle?.user?.first_name} {vehicle?.user?.last_name}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.mediumGrey}
              />
            </TouchableOpacity>
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
                  onPress={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
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
                value={
                  vehicle?.engine_capacity
                    ? `${vehicle.engine_capacity}L`
                    : "N/A"
                }
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
          onPress={handleCreateThread}
          style={styles.secondaryButton}
          activeOpacity={0.85}
        >
          <View style={styles.buttonIconContainer}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={Colors.mrDBlue}
            />
          </View>
          <Text style={styles.secondaryButtonText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleApply}
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Apply to Drive</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
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
              ref={modalRef}
            >
              <Image
                source={vehicle.asset?.url}
                style={{ width, height: "100%", resizeMode: "contain" }}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      {showNoProfileModal && (
        <NoProfileModal setShowNoProfileModal={setShowNoProfileModal} />
      )}

      <AuthRequiredModal
        visible={showAuthModal}
        onDismiss={() => setShowAuthModal(false)}
        action={authAction}
      />
    </View>
  );
};
