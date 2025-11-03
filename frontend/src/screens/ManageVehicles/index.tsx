import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";

import { Card } from "./scene/ui/card";
import { styles } from "./styles";
import { fetchUserVehicles } from "./actions";

export const ManageVehicles = () => {
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
    });

  const userVehicles = data?.pages?.flatMap((page) => page?.data) ?? [];

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
          renderItem={({ item }) => <Card vehicle={item} />}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};
