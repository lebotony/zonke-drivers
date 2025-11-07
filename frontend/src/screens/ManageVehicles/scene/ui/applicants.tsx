import { useEffect } from "react";
import { Text } from "react-native-paper";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { find, isEmpty } from "lodash";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { DriverCard } from "@/src/screens/Drivers/Scene/ui/driverCard";
import { useCustomQuery } from "@/src/useQueryContext";
import { useQueryClient } from "@tanstack/react-query";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "../styles/applicants";
import { fetchApplications } from "../../actions";

export const ApplicantsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    getUpdatedObjectSnapshot,
    onFetchNestedPagination,
    updateNestedPagination,
  } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { userVehicles, applicationsPagination, fetchedVehicleApplications } =
    getCachedData([
      "userVehicles",
      "applicationsPagination",
      "fetchedVehicleApplications",
    ]);

  const vehicle = find(userVehicles, { id: vehicleId });

  const loadVehicleApplications = (applicationsObj: Record<string, any>) => {
    updateNestedPagination(
      vehicleId,
      "applicationsPagination",
      applicationsObj.paginate
    );

    const vehicleApplications = applicationsObj?.data;

    const vehicle = getUpdatedObjectSnapshot("userVehicles", vehicleId);

    updatePaginatedObject("userVehicles", vehicleId, {
      applications: [
        ...(vehicle?.applications ?? []),
        ...(vehicleApplications ?? []),
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
    const { pageParam } = onFetchNestedPagination(
      vehicleId,
      "applicationsPagination"
    );

    fetchApplications({
      pageParam,
      vehicleId,
    }).then((res) => {
      loadVehicleApplications(res);
    });
  };

  useEffect(() => {
    if (!fetchedVehicleApplications?.includes(vehicleId) || !vehicle) {
      handleFetchApplications();
      handleSetFetchedVehicleApplications(vehicleId);
    }
  }, [vehicleId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applicants</Text>

        {/* Vehicle Selector */}
        {/* <VehicleSelector
          vehicles={userVehicles}
          vehicle={vehicle}
          onSelectVehicle={setSelectedVehicle}
        /> */}

        {/* Search Bar */}
        {/* <SearchComponent placeholder="Search applicants..." /> */}
      </View>
      <View style={styles.listContainer}>
        {!isEmpty(vehicle?.applications) ? (
          <FlatList
            data={vehicle?.applications}
            onEndReached={() => {
              const paginationObj = find(applicationsPagination, {
                id: vehicleId,
              })?.paginate;

              if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
                handleFetchApplications();
              }
            }}
            renderItem={({ item }) => <DriverCard driver={item?.driver} />}
            keyExtractor={({ id }, index) => String(id + index)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ddd" />
            <Text style={styles.emptyStateTitle}>No applicants found</Text>
            <Text style={styles.emptyStateText}>
              {vehicle
                ? `No applicants found yet for ${vehicle.model}`
                : "Select a vehicle to view applicants"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
