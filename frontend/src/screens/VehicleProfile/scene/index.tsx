import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash";

import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";
import { useCustomQuery } from "@/src/useQueryContext";
import { Circle } from "@/src/components/shapes/circle";
import { Colors } from "@/constants/ui";
import { Avatar } from "@/src/components/visual/avatar";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { CustomButton } from "@/src/components/elements/button";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { shadowStyles } from "@/src/components/shadowStyles";

import { styles } from "./styles/index";
import { createThread } from "../../DriverProfile/actions";
import { applyForVehicle } from "../actions";
import { NoProfileModal } from "./noProfileModal";

export const Scene = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showNoProfileModal, setShowNoProfileModal] = useState(false);

  const { addItemToPaginatedList } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { vehicles, threads = [] } = getCachedData(["vehicles", "threads"]);
  const vehicle: Vehicle = find(vehicles, { id: vehicleId });

  const width = Dimensions.get("window").width;
  const modalRef = useRef<any>(null);

  const toggleExpanded = () => setIsDescriptionExpanded((prev) => !prev);

  const onTextLayout = (e: any) => {
    if (e.nativeEvent.lines.length > 2) {
      setShowReadMore(true);
    }
  };

  const handleCreateThread = () => {
    console.log("participant_id:", vehicle.user.id);
    createThread({ participant_id: vehicle.user.id })
      .then((response) => {
        if (!find(threads, { id: response.id })) {
          addItemToPaginatedList("threads", response);
        }

        router.push(`/chats/${response.id}`);
      })
      .catch((err) => err);
  };

  const handleApply = () =>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: "relative" }}>
          <Image
            source={vehicle?.asset?.url}
            style={[styles.hero, { width }]}
          />

          <View
            style={{
              position: "absolute",
              top: 28,
              left: 12,
              right: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 6,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Circle size={30} borderColor={Colors.white}>
                <Ionicons name="arrow-back" size={18} color={Colors.white} />
              </Circle>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setExpanded(true);
                }}
              >
                <Circle size={30} borderColor={Colors.white}>
                  <Ionicons name="expand" size={18} color={Colors.white} />
                </Circle>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.meta}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(vehicle?.brand)}{" "}
              {capitalizeFirstLetter(vehicle?.model)}
            </Text>

            <Avatar round width={40} source={vehicle?.user?.asset?.url} />
          </View>

          <View style={styles.descriptionContainer}>
            <Text
              style={styles.descriptionText}
              numberOfLines={isDescriptionExpanded ? undefined : 2}
              onTextLayout={onTextLayout}
            >
              {vehicle?.description}
            </Text>

            {showReadMore && (
              <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{ color: "blue", marginTop: 4 }}>
                  {isDescriptionExpanded ? "Read less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.title}>Overview</Text>

          <SafeAreaView style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons
                      name="local-gas-station"
                      size={22}
                      color={Colors.mrDBlue}
                    />
                  </View>
                </View>

                <Text style={styles.infoTitle}>Fuel Type</Text>

                <Text style={styles.infoText}>
                  {capitalizeFirstLetter(vehicle?.fuel_type)}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons
                      name="event-seat"
                      size={22}
                      color={Colors.mrDBlue}
                    />
                  </View>
                </View>

                <Text style={styles.infoTitle}>Passangers</Text>

                <Text style={styles.infoText}>
                  {vehicle?.passengers ?? "NA"}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <FontAwesome5
                      name="cogs"
                      size={22}
                      color={Colors.mrDBlue}
                    />
                  </View>
                </View>

                <Text style={styles.infoTitle}>Transmission</Text>

                <Text style={styles.infoText}>
                  {vehicle?.manual ? "Manual" : "Automatic"}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <Ionicons
                      name="speedometer-outline"
                      size={22}
                      color={Colors.mrDBlue}
                    />
                  </View>
                </View>

                <Text style={styles.infoTitle}>Mileage</Text>

                <Text style={styles.infoText}>{vehicle?.mileage ?? "NA"}</Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons
                      name="engineering"
                      size={22}
                      color={Colors.mrDBlue}
                    />
                  </View>
                </View>

                <Text style={styles.infoTitle}>Engine Capacity</Text>

                <Text style={styles.infoText}>
                  {vehicle?.engine_capacity
                    ? `${vehicle?.engine_capacity} litre`
                    : "NA"}
                </Text>
              </View>

              <View
                style={[styles.infoItem, { backgroundColor: "transparent" }]}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
        <View style={{ flexDirection: "row", gap: 16, paddingHorizontal: 15 }}>
          <CustomButton
            color={Colors.mrDBlue}
            onPress={handleApply}
            customStyle={{
              marginBottom: 20,
              flex: 1,
              ...shadowStyles,
            }}
          >
            <Text style={{ color: Colors.white }}>Apply</Text>
          </CustomButton>

          <CustomButton
            color={Colors.emeraldGreen}
            onPress={handleCreateThread}
            customStyle={{
              marginBottom: 20,
              flex: 1,

              ...shadowStyles,
            }}
          >
            <Text style={{ color: Colors.white }}>Message</Text>
          </CustomButton>
        </View>
      </ScrollView>

      {expanded && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
            <TouchableOpacity
              onPress={() => setExpanded(false)}
              style={{ position: "absolute", top: 30, left: 20, zIndex: 20 }}
            >
              <Ionicons name="close" size={26} color={Colors.white} />
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
    </SafeAreaView>
  );
};
