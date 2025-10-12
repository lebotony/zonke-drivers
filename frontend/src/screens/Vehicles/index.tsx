import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";

import { useDebounce } from "use-debounce";

import { EvilIcons } from "@expo/vector-icons";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { TextLogo } from "@/src/components/misc/textLogo";
import { Circle } from "@/src/components/shapes/circle";
import { Colors } from "@/constants/ui";
import { SearchComponent } from "@/src/components/searchBar";

import { VehicleCard } from "./scene/ui/card";
import { styles } from "./styles";
import { FilterModal } from "./scene/ui/filter";
import { fetchVehicles } from "./actions";
import { HeaderFilter } from "./scene/ui/FilterHeader";
import { BrandsList, Categories } from "./utils/constants";
import { Brands } from "./scene/ui/brands";

export const VehiclesScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 235]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);

  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const resetRef = useRef<boolean>(undefined);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const initialVisibleCategories = Categories.slice(0, 5);
  const initialVisibleBrands = BrandsList.map((b) => b.id).slice(0, 5);

  const [visibleCategories, setVisibleCategories] = useState<string[]>(
    initialVisibleCategories
  );
  const [visibleBrands, setVisibleBrands] =
    useState<string[]>(initialVisibleBrands);

  const queryClient = useQueryClient();

  const filterParams = {
    brands: selectedBrands,
    fuel_types: selectedFuelTypes,
    price_range: priceRange,
    rating: selectedRating,
    categories: selectedCategories,
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
  }, [selectedBrands]);

  useEffect(() => {
    if (reset) {
      queryClient.removeQueries({ queryKey });
      refetch();
      setReset(false);
    }
  }, [reset]);

  const isDefaultState =
    selectedCategories.length === 0 &&
    selectedBrands.length === 0 &&
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

  const toggleCategory = (id: string) => {
    setSelectedCategories((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

    setVisibleCategories((prev) => {
      const isInitial = initialVisibleCategories.includes(id);
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
    setApplyFilter(false);
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange([0, 235]);
    setVisibleCategories(Categories.slice(0, 5));
    setVisibleBrands(BrandsList.map((b) => b.id).slice(0, 5));
    setSelectedFuelTypes([]);
    setReset((prev) => !prev);
  };

  const handleValueChange = useCallback((low: number, high: number) => {
    setPriceRange([low, high]);
  }, []);

  const handleApplyFilter = () => {
    setApplyFilter(true);
    setShowFilterModal(false);
  };

  const onFilterDismiss = () => {
    setShowFilterModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <TextLogo size="small" />
        <SearchComponent customStyle={{ flex: 1, marginHorizontal: 6 }} />
        <View>
          <TouchableOpacity>
            <Circle size={35} borderColor={Colors.lightGrey}>
              <EvilIcons name="bell" size={20} color="black" />
            </Circle>
          </TouchableOpacity>
        </View>
        <View />
      </View>

      <HeaderFilter
        setShowFilterModal={(value: boolean) => setShowFilterModal(value)}
        selectedBrands={selectedBrands}
        onReset={handleFilterReset}
        toggleBrand={toggleBrand}
        setVisibleBrands={(value: string[]) => setVisibleBrands(value)}
        showReset={!isDefaultState && !showFilterModal}
      />

      <Brands
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        visibleBrandData={() => getVisibleBrandData()}
      />

      <FilterModal
        showReset={!isDefaultState}
        visible={showFilterModal}
        onDismiss={onFilterDismiss}
        onReset={handleFilterReset}
        categories={Categories}
        brands={BrandsList}
        visibleCategories={visibleCategories}
        visibleBrands={visibleBrands}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedFuelTypes={selectedFuelTypes}
        selectedRating={selectedRating}
        priceRange={priceRange}
        onToggleCategory={toggleCategory}
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
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 14,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
