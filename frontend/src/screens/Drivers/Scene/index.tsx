import { useState } from "react";
import { FlatList, View } from "react-native";

import { useDebounce } from "use-debounce";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { fetchDrivers } from "../actions";
import { Header } from "./ui/header";
import { QuickFilters } from "./ui/quickFilters";
import { DriverCard } from "./ui/driverCard";
import { styles } from "./styles/index";

export const Scene = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["drivers", debouncedSearchTerm, selectedPlatforms],
      queryFn: ({ pageParam = 1 }) => {
        const filters = {
          search_term: debouncedSearchTerm,
          platforms: selectedPlatforms,
        };

        return fetchDrivers({ pageParam }, filters);
      },
      getNextPageParam: (lastPage) => {
        const { page, max_page } = lastPage?.paginate;
        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const drivers = data?.pages.flatMap((page) => page.data) ?? [];
  queryClient.setQueryData(["drivers"], drivers);

  const handleSetSelected = (value: string) => {
    if (selectedPlatforms.includes(value)) {
      const newPlatforms = selectedPlatforms.filter(
        (platform) => platform !== value
      );

      return setSelectedPlatforms(newPlatforms);
    }
    return setSelectedPlatforms((prev) => [...(prev || []), value]);
  };

  return (
    <View style={{ flex: 1 }}>
      {router.push("/profileSetup")}
      <Header setSearchTerm={(value: string) => setSearchTerm(value)} />
      <QuickFilters
        onSetSelectedPlatforms={(value: string) => handleSetSelected(value)}
        selectedPlatforms={selectedPlatforms}
        onClear={() => setSelectedPlatforms([])}
      />
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
