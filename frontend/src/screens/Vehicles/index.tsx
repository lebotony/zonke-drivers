import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

import { useDebounce } from "use-debounce";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { VehicleCard } from "./scene/ui/card";
import { styles } from "./styles";
import { FilterModal } from "./scene/ui/filter";
import { fetchVehicles } from "./actions";
import { HeaderFilter } from "./scene/ui/FilterHeader";
import { BrandsList } from "./utils/constants";
import { Brands } from "./scene/ui/brands";
import { QuickFilters } from "../Drivers/Scene/ui/quickFilters";
import { Header } from "../Drivers/Scene/ui/header";

export const VehiclesScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 235]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );

  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const resetRef = useRef<boolean>(undefined);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const initialVisibleBrands = BrandsList.map((b) => b.id).slice(0, 5);

  const [visibleBrands, setVisibleBrands] =
    useState<string[]>(initialVisibleBrands);

  const queryClient = useQueryClient();

  const filterParams = {
    brands: selectedBrands,
    fuel_types: selectedFuelTypes,
    price_range: priceRange,
    rating_range: selectedRating,
    types: selectedVehicleTypes,
  };

  const getFilters = () => {
    if (applyFilter) return filterParams;

    if (!reset && !showFilterModal) return filterParams;

    return {};
  };

  const queryKey = ["vehicles", debouncedSearchTerm];

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      search_term: debouncedSearchTerm,
      ...getFilters(),
    };

    if (applyFilter) {
      setApplyFilter(false);
    }

    if (resetRef.current === true) resetRef.current = false;

    console.log("AAAAAAAAAAAAAAAAAAAAA", filters);

    return fetchVehicles({ pageParam }, filters);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: queryFn,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;

        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const vehicles = data?.pages.flatMap((page) => page?.data) ?? [];
  queryClient.setQueryData(["vehicles"], vehicles);

  // useEffects responsible for triggering refetch
  useEffect(() => {
    if (applyFilter) {
      queryClient.removeQueries({ queryKey });
      refetch();
      setApplyFilter(false);
    }
  }, [applyFilter]);

  useEffect(() => {
    if (!showFilterModal && resetRef.current !== true) {
      queryClient.removeQueries({ queryKey });
      refetch();
    }
  }, [selectedBrands, selectedVehicleTypes]);

  useEffect(() => {
    if (reset) {
      queryClient.removeQueries({ queryKey });
      refetch();
      setReset(false);
    }
  }, [reset]);

  const isDefaultState =
    selectedBrands.length === 0 &&
    selectedVehicleTypes.length === 0 &&
    selectedFuelTypes.length === 0 &&
    selectedRating === null &&
    priceRange[0] === 0 &&
    priceRange[1] === 235;

  const toggleBrand = (id: string) => {
    setSelectedBrands((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

    setVisibleBrands((prev) => {
      const isInitial = initialVisibleBrands.includes(id);
      const isAlreadyVisible = prev.includes(id);

      if (isAlreadyVisible) return prev;

      if (!isInitial) return [id, ...prev];

      return [...prev, id];
    });
  };

  const getVisibleBrandData = () =>
    visibleBrands
      .map((id) => {
        const b = BrandsList.find((br) => br.id === id);
        return b
          ? { ...b, isSelected: selectedBrands.includes(id) }
          : undefined;
      })
      .filter(Boolean) as any[];

  const handleFilterReset = () => {
    resetRef.current = true;

    setSelectedBrands([]);
    setSelectedVehicleTypes([]);
    setApplyFilter(false);
    setSelectedRating(null);
    setPriceRange([0, 235]);
    setVisibleBrands(BrandsList.map((b) => b.id).slice(0, 5));
    setSelectedFuelTypes([]);
    setReset((prev) => !prev);
  };

  const handleValueChange = useCallback((low: number, high: number) => {
    setPriceRange([low, high]);
  }, []);

  const handleSetSelectedVehicleType = (value: string) => {
    setSelectedVehicleTypes((prev) => {
      if (selectedVehicleTypes?.includes(value)) {
        return selectedVehicleTypes.filter((type) => type !== value);
      } else {
        return [...(prev || []), value];
      }
    });
  };

  const handleApplyFilter = () => {
    setApplyFilter(true);
    setShowFilterModal(false);
  };

  const onFilterDismiss = () => {
    setShowFilterModal(false);
  };

  // To use memoized vehicle card
  const renderVehicle = useCallback(({ item }: { item: Vehicle }) => {
    return <VehicleCard vehicle={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header setSearchTerm={(value: string) => setSearchTerm(value)} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <QuickFilters
          onSetSelectedPlatforms={(value: string) =>
            handleSetSelectedVehicleType(value)
          }
          selectedPlatforms={selectedVehicleTypes}
          onClear={() => setSelectedVehicleTypes([])}
          isVehicle
        />

        <HeaderFilter
          setShowFilterModal={(value: boolean) => setShowFilterModal(value)}
          onReset={handleFilterReset}
          toggleBrand={toggleBrand}
          setVisibleBrands={(value: string[]) => setVisibleBrands(value)}
          showReset={!isDefaultState && !showFilterModal}
        />
      </View>

      <View style={{ height: 80 }}>
        <Brands
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          visibleBrandData={() => getVisibleBrandData()}
        />
      </View>

      <FilterModal
        showReset={!isDefaultState}
        visible={showFilterModal}
        onDismiss={onFilterDismiss}
        onReset={handleFilterReset}
        brands={BrandsList}
        visibleBrands={visibleBrands}
        selectedBrands={selectedBrands}
        selectedFuelTypes={selectedFuelTypes}
        selectedVehicleTypes={selectedVehicleTypes}
        selectedRating={selectedRating}
        priceRange={priceRange}
        onToggleVehicleTypes={handleSetSelectedVehicleType}
        onToggleBrand={toggleBrand}
        onFuelToggle={(f) =>
          setSelectedFuelTypes((s) =>
            s.includes(f) ? s.filter((x) => x !== f) : [...s, f]
          )
        }
        onPriceChange={handleValueChange}
        onRatingSelect={setSelectedRating}
        onApply={handleApplyFilter}
      />

      <FlatList
        data={vehicles}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        keyExtractor={(i) => i?.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        // renderItem={renderVehicle}

        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 14,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
