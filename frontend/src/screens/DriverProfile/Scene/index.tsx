import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { find, isEmpty } from "lodash";

import { useQueryClient } from "@tanstack/react-query";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useAuth } from "@/src/authContext";
import { shadowStyles } from "@/src/components/shadowStyles";
import { calculateAge } from "@/src/helpers/calculateAge";
import { Spinner } from "@/src/components/elements/Spinner";

import { Platforms } from "../../Drivers/Scene/ui/platforms";
import { BackArrow } from "../../../components/BackArrow/header";
import { Licences } from "./ui/licences";
import { createThread, fetchDriverProfile } from "../actions";
import { detailsDef } from "./ui/detailsPill";
import { styles } from "./styles";
import { IS_IOS } from "../../../../constants/srcConstants";

export const Scene = () => {
  const { id } = useLocalSearchParams();
  const driverId = Array.isArray(id) ? id[0] : id;

  const { addItemToPaginatedList } = usePaginatedCache();
  const { authState } = useAuth();

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const {
    drivers,
    user,
    threads = [],
    driverProfile,
    applicationDrivers = [],
  } = getCachedData([
    "drivers",
    "user",
    "threads",
    "driverProfile",
    "applicationDrivers",
  ]);

  const isUserProfile = driverProfile?.id === driverId;
  let driver = isUserProfile ? driverProfile : find(drivers, { id: driverId });

  if (!driver) driver = find(applicationDrivers, { id: driverId });

  const isVehicleOwner = user?.role === "owner";

  const handleCreateThread = () =>
    createThread({ participant_id: driver.user_id }).then((response) => {
      if (!find(threads, { id: response.id })) {
        addItemToPaginatedList("threads", response);
      }

      router.push(`/chats/${response.id}`);
    });

  const handleHireDriver = () => {
    router.push({
      pathname: "/chooseVehicle",
      params: {
        driverId: driver.id,
        driverName: `${driver.first_name} ${driver.last_name}`,
      },
    });
  };

  useEffect(() => {
    if (!driver) {
      fetchDriverProfile(driverId).then((res) =>
        queryClient.setQueryData(
          ["applicationDrivers"],
          (oldData: Driver[]) => {
            if (!find(applicationDrivers, { id: driverId }))
              return [...(oldData ?? []), res];
            return oldData;
          },
        ),
      );
    }
  }, [driver]);

  if (!driver) return <Spinner />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: !isUserProfile ? 100 : 20 }}
        >
          {/* Hero Section with Gradient Overlay */}
          <View style={styles.heroSection}>
            <View style={styles.profileHeroCard}>
              {/* Modern Back Button */}
              <View style={styles.backButtonContainer}>
                <BackArrow customStyles={styles.backArrowOverride} />
              </View>

              <LinearGradient
                colors={[
                  "rgba(118, 203, 237, 0.08)",
                  "rgba(118, 203, 237, 0.02)",
                ]}
                style={styles.gradientBackground}
              />

              <View style={styles.avatarContainer}>
                {driver?.asset_url ? (
                  <View style={styles.avatarWrapper}>
                    <Avatar
                      source={driver?.asset_url}
                      round
                      shadow
                      width={140}
                    />
                    <View style={styles.avatarBorder} />
                  </View>
                ) : (
                  <View style={styles.defaultPicModern}>
                    <Ionicons name="person" size={70} color={Colors.mrDBlue} />
                  </View>
                )}
              </View>

              <View style={styles.nameSection}>
                <Text style={styles.nameModern}>
                  {driver?.first_name} {driver?.last_name}
                </Text>
                <Text style={styles.ageModern}>
                  {calculateAge(driver?.dob)} years old
                </Text>
              </View>

              {driver?.location?.place && (
                <View style={styles.locationBadge}>
                  <MaterialIcons
                    name="location-pin"
                    size={16}
                    color={Colors.mrDBlue}
                  />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {driver?.location?.place}
                  </Text>
                </View>
              )}

              {driver?.rating && (
                <View style={styles.ratingBadgeModern}>
                  <AntDesign name="star" size={16} color={Colors.yellow} />
                  <Text style={styles.ratingTextModern}>{driver?.rating}</Text>
                  <Text style={styles.ratingLabelModern}>rating</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.contentSection}>
            {/* Description Card */}
            {!isEmpty(driver?.description) && (
              <View style={styles.descriptionCard}>
                <Text style={styles.sectionLabel}>About</Text>
                <Text style={styles.descriptionModern} numberOfLines={3}>
                  {driver?.description}
                </Text>
              </View>
            )}

            {/* Driver Stats - Quick Highlights */}
            <View style={styles.quickStatsCard}>
              <View style={styles.quickStatItem}>
                <View style={styles.quickStatIconWrapper}>
                  <AntDesign name="star" size={20} color={Colors.yellow} />
                </View>
                <Text style={styles.quickStatValue}>
                  {driver?.rating || "N/A"}
                </Text>
                <Text style={styles.quickStatLabel}>Rating</Text>
              </View>

              <View style={styles.quickStatDivider} />

              <View style={styles.quickStatItem}>
                <View style={styles.quickStatIconWrapper}>
                  <MaterialIcons
                    name="access-time"
                    size={20}
                    color={Colors.emeraldGreen}
                  />
                </View>
                <Text style={styles.quickStatValue}>
                  {driver?.experience || "0"}y
                </Text>
                <Text style={styles.quickStatLabel}>Experience</Text>
              </View>

              <View style={styles.quickStatDivider} />

              <View style={styles.quickStatItem}>
                <View style={styles.quickStatIconWrapper}>
                  <Ionicons name="car-sport" size={20} color={Colors.mrDBlue} />
                </View>
                <Text style={styles.quickStatValue}>
                  {driver?.previous_vehicles || "0"}
                </Text>
                <Text style={styles.quickStatLabel}>Vehicles</Text>
              </View>
            </View>

            {/* Platforms Section */}
            {!isEmpty(driver?.platforms) && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Platforms</Text>
                <Platforms
                  customContainerStyle={styles.platormsContainer}
                  platforms={driver?.platforms}
                />
              </View>
            )}

            {/* Licences Section */}
            <Licences licences={driver?.licences} />

            {/* Detailed Stats */}
            <View style={styles.detailedStatsCard}>
              <Text style={styles.sectionTitle}>Professional Details</Text>
              <View style={styles.statsGrid}>
                {detailsDef.map((detail, index) => (
                  <View
                    key={`${detail.slug}-${index}`}
                    style={styles.statCardModern}
                  >
                    <View style={styles.statIconCircle}>{detail.icon}</View>
                    <Text style={styles.statValueModern}>
                      {driver?.[`${detail.slug}`] || "N/A"}
                    </Text>
                    <Text style={styles.statLabelModern}>{detail.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Comments CTA */}
            <CustomButton
              onPress={() => router.push(`/comments/${driverId}`)}
              color={Colors.white}
              customStyle={styles.commentsButton}
            >
              <Ionicons
                name="chatbox-outline"
                size={20}
                color={Colors.mrDBlue}
              />
              <Text style={styles.commentsButtonText}>
                View Reviews & Comments
              </Text>
            </CustomButton>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Enhanced Footer with Message and Hire CTAs */}
      {!isUserProfile && (
        <View style={styles.floatingFooter}>
          <SafeAreaView edges={["bottom"]}>
            <View style={styles.footerButtonContainer}>
              {isVehicleOwner && (
                <CustomButton
                  color={Colors.mrDBlue}
                  onPress={handleHireDriver}
                  customStyle={[styles.actionButton, styles.hireButton]}
                >
                  <Ionicons name="car" size={20} color={Colors.white} />
                  <Text style={styles.actionButtonText}>Hire</Text>
                </CustomButton>
              )}

              <CustomButton
                color={Colors.emeraldGreen}
                onPress={handleCreateThread}
                customStyle={[
                  styles.actionButton,
                  isVehicleOwner
                    ? styles.messageButtonHalf
                    : styles.messageButtonModern,
                ]}
              >
                <Ionicons name="chatbubble" size={20} color={Colors.white} />
                <Text style={styles.actionButtonText}>Message</Text>
              </CustomButton>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};
