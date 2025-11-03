import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View, FlatList, Animated } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SearchComponent } from "@/src/components/searchBar";
import { Colors } from "@/constants/ui";
import { Modal } from "@/src/components/modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { DriverCard } from "@/src/screens/Drivers/Scene/ui/driverCard";
import { PopupMenu } from "@/src/components/popup";
import { useCustomQuery } from "@/src/useQueryContext";
import { useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { VehicleSelector } from "./vehicleSelector";
import { styles } from "../styles/applicants";
import { fetchApplications } from "../../actions";
import { isEmpty } from "lodash";

export const ApplicantsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState<Driver | null>(
    null
  );
  const [fadeAnim] = useState(new Animated.Value(0));

  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const queryClient = useQueryClient();
  const { updatePaginatedObject, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const {
    userVehicles,
    vehicleApplicationsPagination,
    fetchedVehicleApplications,
  } = getCachedData([
    "userVehicles",
    "vehicleApplicationsPagination",
    "fetchedVehicleApplications",
  ]);

  const initialVehicle =
    userVehicles?.find((v) => v.id === vehicleId) || userVehicles?.[0] || null;

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    initialVehicle
  );

  const loadVehicleApplications = (applicationsObj) => {
    queryClient.setQueryData(
      ["vehicleApplicationsPagination"],
      applicationsObj.paginate
    );

    const vehicleApplications = applicationsObj?.data;

    const vehicle = getUpdatedObjectSnapshot("vehicle", vehicleId);

    updatePaginatedObject("userVehicles", vehicleId, {
      ...vehicle,
      applications: [
        ...(vehicle?.vehicleApplications || []),
        ...vehicleApplications,
      ],
    });
  };

  const handleSetFetchedVehicleApplications = (id: string) =>
    queryClient.setQueryData(
      ["fetchedVehicleApplications"],
      (fetchedVehicleApplications: Vehicle["id"][]) => [
        ...(fetchedVehicleApplications ?? []),
        id,
      ]
    );

  const handleFetchApplications = () => {
    const page = vehicleApplicationsPagination?.page;
    const max_page = vehicleApplicationsPagination?.max_page;
    const pageParam = page < max_page ? page + 1 : undefined;

    fetchApplications({ pageParam, vehicleId }).then((res) => {
      loadVehicleApplications(res);
    });
  };

  useEffect(
    () =>
      setSelectedVehicle(
        userVehicles?.find((v) => v.id === vehicleId) ||
          userVehicles?.[0] ||
          null
      ),
    [userVehicles]
  );

  useEffect(() => {
    if (!fetchedVehicleApplications?.includes(vehicleId) || !selectedVehicle) {
      handleFetchApplications();
      handleSetFetchedVehicleApplications(vehicleId);
    }
  }, [selectedVehicle]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applicants</Text>

        {/* Vehicle Selector */}
        <VehicleSelector
          vehicles={userVehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        />

        {/* Search Bar */}
        {/* <SearchComponent placeholder="Search applicants..." /> */}
      </View>
      <View style={styles.listContainer}>
        {!isEmpty(selectedVehicle?.applications) ? (
          <FlatList
            data={selectedVehicle?.applications}
            renderItem={({ item }) => <DriverCard driver={item?.driver} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ddd" />
            <Text style={styles.emptyStateTitle}>No applicants found</Text>
            <Text style={styles.emptyStateText}>
              {selectedVehicle
                ? `No applicants found yet for ${selectedVehicle.model}`
                : "Select a vehicle to view applicants"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
