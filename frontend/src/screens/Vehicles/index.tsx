import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

import { useDebounce } from "use-debounce";
import { isEmpty } from "lodash";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import { DynamicHeader } from "@/src/components/dynamicHeader";
import { Colors } from "@/constants/ui";

import { VehicleCard } from "./scene/ui/card";
import { styles } from "./styles";
import { FilterModal } from "./scene/ui/filter";
import { fetchVehicles } from "./actions";
import { HeaderFilter } from "./scene/ui/FilterHeader";
import { BrandsList } from "./utils/constants";
import { Brands } from "./scene/ui/brands";
import { Header } from "../Drivers/Scene/ui/header";
import { HeaderFilterPlatforms } from "./scene/ui/platforms";
import { IS_IOS } from "../../../constants/srcConstants";

export const VehiclesScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 235]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    [],
  );

  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const resetRef = useRef<boolean>(undefined);
  const didMountRef = useRef(false);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

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

  const queryKey = ["vehicles"];

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      search_term: debouncedSearchTerm,
      ...getFilters(),
    };

    if (applyFilter) {
      setApplyFilter(false);
    }

    if (resetRef.current === true) resetRef.current = false;

    return fetchVehicles({ pageParam }, filters);
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

  const vehicles = data?.pages.flatMap((page) => page?.data) ?? [];

  console.log(
    "IIIIIIIIIII",
    vehicles.map((v) => v?.user?.location?.country),
  );

  // useEffects responsible for triggering refetch
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      queryClient.removeQueries({ queryKey });
      refetch();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (applyFilter) {
      queryClient.removeQueries({ queryKey });
      refetch();
      setApplyFilter(false);
    }
  }, [applyFilter]);

  useEffect(() => {
    if (didMountRef.current) {
      if (!showFilterModal && resetRef.current !== true) {
        queryClient.removeQueries({ queryKey });
        refetch();
      }
    } else {
      didMountRef.current = true;
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
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  };

  const handleFilterReset = () => {
    resetRef.current = true;

    setSelectedBrands([]);
    setSelectedVehicleTypes([]);
    setApplyFilter(false);
    setSelectedRating(null);
    setPriceRange([0, 235]);
    setSelectedFuelTypes([]);
    setReset((prev) => !prev);
  };

  const handleValueChange = useCallback((low: number, high: number) => {
    setPriceRange([low, high]);
  }, []);

  const handleSetSelectedVehicleType = (value: string) => {
    if (selectedVehicleTypes.includes(value)) {
      const newVehicles = selectedVehicleTypes.filter(
        (platform) => platform !== value,
      );

      return setSelectedVehicleTypes(newVehicles);
    }
    return setSelectedVehicleTypes((prev) => [...(prev || []), value]);
  };

  const handleApplyFilter = () => {
    setApplyFilter(true);
    setShowFilterModal(false);
  };

  const onFilterDismiss = () => {
    setShowFilterModal(false);
  };

  // To use memoized vehicle card
  const renderVehicle = useCallback(
    ({ item, index }: { item: Vehicle; index: number }) => {
      const isLast = index === vehicles.length - 1;
      return <VehicleCard vehicle={item} isLast={isLast} />;
    },
    [vehicles.length],
  );

  return (
    <View style={styles.container}>
      <DynamicHeader
        headerBgColor={Colors.bg}
        header={
          <View style={[IS_IOS && styles.iosHeader]}>
            <Header
              setShowFilterModal={(value: boolean) => setShowFilterModal(value)}
              setSearchTerm={(value: string) => setSearchTerm(value)}
              isVehicleList
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <HeaderFilterPlatforms
                onSetSelectedPlatforms={(value: string) =>
                  handleSetSelectedVehicleType(value)
                }
                selectedPlatforms={selectedVehicleTypes}
              />

              <HeaderFilter
                setShowFilterModal={(value: boolean) =>
                  setShowFilterModal(value)
                }
                onReset={handleFilterReset}
                toggleBrand={toggleBrand}
                showReset={!isDefaultState && !showFilterModal}
              />
            </View>

            <View style={{ height: 80 }}>
              <Brands
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                brands={BrandsList}
              />
            </View>
          </View>
        }
      >
        {({ onScroll, scrollEventThrottle, contentContainerStyle }) =>
          isEmpty(vehicles) && !isLoading ? (
            <NoData />
          ) : isLoading ? (
            <Spinner />
          ) : (
            <FlatList
              onScroll={onScroll}
              scrollEventThrottle={scrollEventThrottle}
              data={vehicles}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              keyExtractor={(i) => i?.id}
              renderItem={renderVehicle}
              contentContainerStyle={[
                contentContainerStyle,
                {
                  gap: 12,
                  paddingHorizontal: 14,
                },
              ]}
              showsVerticalScrollIndicator={false}
            />
          )
        }
      </DynamicHeader>

      <FilterModal
        showReset={!isDefaultState}
        visible={showFilterModal}
        onDismiss={onFilterDismiss}
        onReset={handleFilterReset}
        brands={BrandsList}
        selectedBrands={selectedBrands}
        selectedFuelTypes={selectedFuelTypes}
        selectedVehicleTypes={selectedVehicleTypes}
        selectedRating={selectedRating}
        priceRange={priceRange}
        onToggleVehicleTypes={handleSetSelectedVehicleType}
        onToggleBrand={toggleBrand}
        onFuelToggle={(f) =>
          setSelectedFuelTypes((s) =>
            s.includes(f) ? s.filter((x) => x !== f) : [...s, f],
          )
        }
        onPriceChange={handleValueChange}
        onRatingSelect={setSelectedRating}
        onApply={handleApplyFilter}
      />
    </View>
  );
};
