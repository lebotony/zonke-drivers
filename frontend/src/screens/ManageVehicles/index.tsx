import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Card } from "./scene/ui/card";
import { styles } from "./styles";
import { fetchManagementVehicles } from "./actions";

export const ManageVehicles = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["vehicleDrivers"],
      queryFn: fetchManagementVehicles,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;

        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const vehicleDrivers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Management</Text>

      <FlatList
        data={vehicleDrivers}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        keyExtractor={({ id }, _index) => String(id)}
        renderItem={({ item }) => <Card vehicleDriver={item} />}
        contentContainerStyle={{ paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
