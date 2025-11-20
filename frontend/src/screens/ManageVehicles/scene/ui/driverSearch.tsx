import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { useDebounce } from "use-debounce";
import { isEmpty } from "lodash";

import { DriverCard } from "@/src/screens/Drivers/Scene/ui/driverCard";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Colors } from "@/constants/ui";
import { Spinner } from "@/src/components/elements/Spinner";
import { SearchComponent } from "@/src/components/searchBar";
import { NoData } from "@/src/components/NoData";
import { fetchDrivers } from "@/src/screens/Drivers/actions";

import { styles } from "../styles/applicants";
import { VehicleDriverModal } from "./vehicleDriverModal";

export const DriverSearch = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [showVehicleDriverModal, setShowVehicleDriverModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const queryKey = ["searchedDrivers"];

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      name: debouncedSearchTerm,
    };

    return fetchDrivers({ pageParam }, filters);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    getNextPageParam: (lastPage) => {
      const page = lastPage?.paginate?.page;
      const max_page = lastPage?.paginate?.max_page;

      return page < max_page ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const drivers = data?.pages.flatMap((page) => page.data) ?? [];

  // useEffects responsible for triggering refetch
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      queryClient.removeQueries({ queryKey });
      refetch();
    }
  }, [debouncedSearchTerm]);

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

          <Text style={styles.headerText}>Search Driver Name</Text>
        </View>
        <SearchComponent
          onChange={setSearchTerm}
          placeholder="Search Driver"
          height={50}
          customStyle={{ paddingHorizontal: 10, marginBottom: 10 }}
        />
      </View>

      {
        <View style={styles.listContainer}>
          {isEmpty(drivers) && !isLoading ? (
            <NoData />
          ) : isLoading ? (
            <Spinner />
          ) : (
            <FlatList
              data={drivers}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => String(item?.id + index)}
              renderItem={({ item }) => (
                <DriverCard
                  setSelectedDriverId={setSelectedDriverId}
                  setShowVehicleDriverModal={setShowVehicleDriverModal}
                  driver={item}
                  applicant
                />
              )}
              contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
            />
          )}
        </View>
      }

      {showVehicleDriverModal && (
        <VehicleDriverModal
          setShowVehicleDriverModal={setShowVehicleDriverModal}
          setSelectedDriverId={setSelectedDriverId}
          driverId={selectedDriverId as string}
          vehicleId={vehicleId}
        />
      )}
    </SafeAreaView>
  );
};
