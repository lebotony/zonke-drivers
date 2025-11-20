import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { find, isEmpty } from "lodash";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { DriverCard } from "@/src/screens/Drivers/Scene/ui/driverCard";
import { useCustomQuery } from "@/src/useQueryContext";
import { useQueryClient } from "@tanstack/react-query";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Colors } from "@/constants/ui";

import { styles } from "../styles/applicants";
import { fetchApplications, setApplicationsSeen } from "../../actions";
import { VehicleDriverModal } from "./vehicleDriverModal";
import { VehicleSelector } from "./vehicleSelector";
import { capitalizeFirstLetter } from "@/src/utils";

export const ApplicantsScreen = () => {
  const { id } = useLocalSearchParams();
  const initialVehicleId = Array.isArray(id) ? id[0] : id;

  const { getCachedData } = useCustomQuery();
  const { userVehicles, applicationsPagination, fetchedVehicleApplications } =
    getCachedData([
      "userVehicles",
      "applicationsPagination",
      "fetchedVehicleApplications",
    ]);

  const initialVehicle =
    find(userVehicles, { id: initialVehicleId }) || userVehicles?.[0];

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle>(initialVehicle);
  const [showVehicleDriverModal, setShowVehicleDriverModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    getUpdatedObjectSnapshot,
    onFetchNestedPagination,
    updateNestedPagination,
  } = usePaginatedCache();

  const loadVehicleApplications = (applicationsObj: Record<string, any>) => {
    const vehicleId = selectedVehicle?.id;
    if (!vehicleId) return;

    updateNestedPagination(
      vehicleId,
      "applicationsPagination",
      applicationsObj.paginate
    );

    const vehicleApplications = applicationsObj?.data ?? [];
    const vehicleSnapshot = getUpdatedObjectSnapshot("userVehicles", vehicleId);

    updatePaginatedObject("userVehicles", vehicleId, {
      unseen_applications_count: 0,
      applications: [
        ...(vehicleSnapshot?.applications ?? []),
        ...vehicleApplications,
      ],
    });

    setApplicationsSeen(vehicleId);
  };

  const handleSetFetchedVehicleApplications = (id: string) =>
    queryClient.setQueryData(
      ["fetchedVehicleApplications"],
      (prev: Vehicle["id"][] = []) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      }
    );

  const handleFetchApplications = () => {
    if (!selectedVehicle?.id) return;

    const { pageParam } = onFetchNestedPagination(
      selectedVehicle.id,
      "applicationsPagination"
    );

    fetchApplications({
      pageParam,
      vehicleId: selectedVehicle.id,
    }).then((res) => {
      loadVehicleApplications(res);
    });
  };

  useEffect(() => {
    if (!selectedVehicle?.id) return;

    const alreadyFetched = fetchedVehicleApplications?.includes(
      selectedVehicle.id
    );

    if (!alreadyFetched) {
      handleFetchApplications();
      handleSetFetchedVehicleApplications(selectedVehicle.id);
    }
  }, [selectedVehicle?.id]);

  const currentVehicle = find(userVehicles, { id: selectedVehicle?.id });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={22}
              color={Colors.dimGrey}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Applicants</Text>
        </View>

        <View style={{ marginTop: 8 }}>
          <VehicleSelector
            vehicles={userVehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={(vehicle: Vehicle) => {
              setSelectedVehicle(vehicle);
            }}
          />
        </View>
      </View>

      {
        <View style={styles.listContainer}>
          {!isEmpty(currentVehicle?.applications) ? (
            <FlatList
              data={currentVehicle?.applications}
              onEndReached={() => {
                const paginationObj = find(applicationsPagination, {
                  id: selectedVehicle?.id,
                })?.paginate;

                if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
                  handleFetchApplications();
                }
              }}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 7 }}>
                  <DriverCard
                    applicant
                    seen={item?.seen}
                    driver={item?.driver}
                    setSelectedDriverId={(val: string) =>
                      setSelectedDriverId(val)
                    }
                    setShowVehicleDriverModal={(val: boolean) =>
                      setShowVehicleDriverModal(val)
                    }
                  />
                </View>
              )}
              keyExtractor={({ id }, index) => String(id + index)}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 10 }}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={64} color="#ddd" />
              <Text style={styles.emptyStateTitle}>No applicants found</Text>
              <Text style={styles.emptyStateText}>
                {selectedVehicle
                  ? `No applicants found yet for ${capitalizeFirstLetter(`${selectedVehicle.brand} ${selectedVehicle.model}`)}`
                  : "Select a vehicle to view applicants"}
              </Text>
            </View>
          )}
        </View>
      }

      {/* 🔹 Vehicle Driver Modal */}
      {showVehicleDriverModal && (
        <VehicleDriverModal
          setShowVehicleDriverModal={setShowVehicleDriverModal}
          setSelectedDriverId={setSelectedDriverId}
          driverId={selectedDriverId as string}
          vehicleId={selectedVehicle.id}
        />
      )}
    </SafeAreaView>
  );
};
