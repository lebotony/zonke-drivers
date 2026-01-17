import { TouchableOpacity, View, Animated, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useRef } from "react";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { isEmpty } from "lodash";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { Spinner } from "@/src/components/elements/Spinner";

import { styles } from "../styles/driverCard";
import { Platforms } from "./platforms";
import { Details } from "./details";

type DriverProps = {
  driver: Driver;
  applicant?: boolean;
  setSelectedDriverId?: (val: string) => void;
  setShowVehicleDriverModal?: (val: boolean) => void;
  seen?: boolean;
};

export const DriverCard = (props: DriverProps) => {
  const {
    driver,
    applicant = false,
    setSelectedDriverId,
    setShowVehicleDriverModal,
  } = props;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  if (!driver) return <Spinner />;

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(`/drivers/${driver?.id}`)}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.cardContent}>
          <View style={styles.topSection}>
            <View style={styles.avatarContainer}>
              {driver?.asset_url ? (
                <Avatar source={driver?.asset_url} radius shadow width={92} />
              ) : (
                <View style={styles.defaultPic}>
                  <Ionicons
                    name="person"
                    size={50}
                    color={Colors.mediumLightGrey}
                  />
                </View>
              )}
            </View>

            <View style={styles.infoSection}>
              <Details driver={driver} />
            </View>
          </View>

          {!isEmpty(driver?.platforms) && (
            <View style={styles.platformsSection}>
              <Platforms
                platforms={driver?.platforms}
                customContainerStyle={styles.platformsContainer}
              />
            </View>
          )}

          <View style={styles.actionsSection}>
            {applicant ? (
              <View style={styles.buttonRow}>
                <CustomButton
                  color="white"
                  onPress={() => router.push(`/drivers/${driver?.id}`)}
                  customStyle={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>View Profile</Text>
                </CustomButton>
                <CustomButton
                  color="white"
                  onPress={() => {
                    setSelectedDriverId!(driver?.id);
                    setShowVehicleDriverModal!(true);
                  }}
                  customStyle={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Add Driver</Text>
                </CustomButton>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() => router.push(`/drivers/${driver?.id}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.viewProfileText}>View Full Profile</Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.mrDBlue}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};
