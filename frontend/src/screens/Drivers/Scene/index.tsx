import { FlatList, View } from "react-native";

import { router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchDrivers } from "../actions";
import { Header } from "./ui/header";
import { QuickFilters } from "./ui/quickFilters";
import { DriverCard } from "./ui/driverCard";
import { styles } from "./styles/index";

{
  /* {router.push("/profileSetup")} */
}
{
  /* {router.push("/drivers/1")} */
}
{
  /* {router.push("/posts")} */
}

export const Scene = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["drivers"],
      queryFn: fetchDrivers,
      getNextPageParam: (lastPage) => {
        const { page, max_page } = lastPage.paginate;
        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const drivers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <QuickFilters />
      <View style={styles.drivers}>
        <FlatList
          data={drivers}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }, _index) => String(id)}
          renderItem={({ item }) => <DriverCard driver={item} />}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
        />
      </View>
    </View>
  );
};
