import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import { useCustomQuery } from "@/src/useQueryContext";

import { Card } from "./scene/ui/card";
import { styles } from "./styles";
import { fetchUserVehicles } from "./actions";
import { VehicleDriverModal } from "./scene/ui/vehicleDriverModal";

export const ManageVehicles = () => {
  const [showVehicleDriverModal, setShowVehicleDriverModal] = useState(false);
  const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  const { getCachedData } = useCustomQuery();
  const { fetchedOnMount } = getCachedData(["fetchedOnMount"]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["userVehicles"],
      queryFn: fetchUserVehicles,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;

        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
      refetchOnMount: fetchedOnMount ? undefined : "always",
    });

  const userVehicles = data?.pages?.flatMap((page) => page?.data) ?? [];

  if (!fetchedOnMount)
    return queryClient.setQueryData(["fetchedOnMount"], true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Management</Text>

      {isEmpty(userVehicles) && !isLoading ? (
        <NoData />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={userVehicles}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <Card
              vehicle={item}
              setVehicleId={setVehicleId}
              setShowVehicleDriverModal={setShowVehicleDriverModal}
            />
          )}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {showVehicleDriverModal && (
        <VehicleDriverModal
          setShowVehicleDriverModal={setShowVehicleDriverModal}
          vehicleId={vehicleId}
          accident
        />
      )}
    </SafeAreaView>
  );
};
