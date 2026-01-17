import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { isEmpty } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import { BackArrow } from "@/src/components/BackArrow/header";
import { Colors } from "@/constants/ui";

import { VehicleSelectionCard } from "./ui/VehicleSelectionCard";
import { ConfirmationModal } from "./ui/ConfirmationModal";
import { fetchUserVehicles } from "../ManageVehicles/actions";
import { createVehicleDriver } from "../ManageVehicles/actions";
import { styles } from "./styles";

export const ChooseVehicleScreen = () => {
  const { driverId, driverName } = useLocalSearchParams();
  const driverIdStr = Array.isArray(driverId) ? driverId[0] : driverId;
  const driverNameStr = Array.isArray(driverName) ? driverName[0] : driverName;

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryKey = ["userVehicles"];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: fetchUserVehicles,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;
        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const vehicles = data?.pages.flatMap((page) => page?.data) ?? [];

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!selectedVehicle || !driverIdStr) return;

    setIsSubmitting(true);
    try {
      await createVehicleDriver({
        driver_id: driverIdStr,
        vehicle_id: selectedVehicle.id,
      });

      setShowConfirmation(false);
      router.push("/(tabs)/manage");
    } catch (error) {
      console.error("Failed to assign driver:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedVehicle(null);
  };

  const renderVehicle = useCallback(
    ({ item, index }: { item: Vehicle; index: number }) => {
      const isLast = index === vehicles.length - 1;
      return (
        <VehicleSelectionCard
          vehicle={item}
          isLast={isLast}
          onSelect={() => handleVehicleSelect(item)}
        />
      );
    },
    [vehicles.length],
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BackArrow left={0} top={10} />
            <Text style={styles.headerTitle}>Choose Vehicle</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Select a vehicle to assign {driverNameStr || "this driver"}
          </Text>
        </View>

        {isEmpty(vehicles) && !isLoading ? (
          <NoData />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={vehicles}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            keyExtractor={(i) => i?.id}
            renderItem={renderVehicle}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {showConfirmation && selectedVehicle && (
        <ConfirmationModal
          visible={showConfirmation}
          vehicle={selectedVehicle}
          driverName={driverNameStr}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </View>
  );
};
