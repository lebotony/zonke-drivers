import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, Modal } from "react-native";
import { router } from "expo-router";

import { useDebounce } from "use-debounce";
import { isEmpty } from "lodash";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import {
  DynamicHeader,
  DynamicHeaderRef,
} from "@/src/components/dynamicHeader";

import { SaleCard } from "./scene/ui/SaleCard";
import { VehicleProfileView } from "./scene/ui/VehicleProfileView";
import { styles } from "./styles";
import { fetchVehiclesOnSale, fetchVehicleById } from "./actions";
import { BrandsList } from "../Vehicles/utils/constants";
import { Brands } from "../Vehicles/scene/ui/brands";
import { Header } from "../Drivers/Scene/ui/header";
import { ResetFAB } from "../Vehicles/scene/ui/ResetFAB";
import { FilterModal } from "./scene/ui/filter";
import { useAuth } from "@/src/authContext";
import { useCustomQuery } from "@/src/useQueryContext";

type VehicleSalesScreenProps = {
  toggleSales: () => void;
  targetVehicleId?: string | null;
  onVehicleViewed?: () => void;
  showBackButton?: boolean;
};

export const VehicleSalesScreen = (props: VehicleSalesScreenProps) => {
  const { toggleSales, targetVehicleId, onVehicleViewed, showBackButton } =
    props;
  const { authState } = useAuth();
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);

  const isOwner = user?.role === "owner";
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleProfile, setShowVehicleProfile] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const resetRef = useRef<boolean>(undefined);
  const didMountRef = useRef(false);
  const flatListRef = useRef<FlatList>(null);
  const dynamicHeaderRef = useRef<DynamicHeaderRef>(null);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [targetVehicle, setTargetVehicle] = useState<Vehicle | null>(null);
  const [isFetchingTarget, setIsFetchingTarget] = useState(false);
  const [isLoadingTargetVehicle, setIsLoadingTargetVehicle] = useState(false);
  const targetVehicleFetchedRef = useRef<string | null>(null);

  const queryClient = useQueryClient();

  const filterParams = {
    brands: selectedBrands,
    fuel_types: selectedFuelTypes,
    price_range: priceRange,
    types: selectedVehicleTypes,
    country: selectedCountry,
  };

  const getFilters = () => {
    if (applyFilter) return filterParams;

    if (!reset && !showFilterModal) return filterParams;

    return {};
  };

  const queryKey = ["vehiclesOnSale"];

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      search_term: debouncedSearchTerm,
      ...getFilters(),
    };

    if (applyFilter) {
      setApplyFilter(false);
    }

    if (resetRef.current === true) resetRef.current = false;

    return fetchVehiclesOnSale({ pageParam }, filters);
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

  const paginatedVehicles = data?.pages.flatMap((page) => page?.data) ?? [];

  const vehicles = targetVehicle
    ? [
        targetVehicle,
        ...paginatedVehicles.filter((v) => v?.id !== targetVehicle.id),
      ]
    : paginatedVehicles;

  useEffect(() => {
    if (
      targetVehicleId &&
      targetVehicleFetchedRef.current !== targetVehicleId &&
      !isFetchingTarget
    ) {
      targetVehicleFetchedRef.current = targetVehicleId;
      setIsFetchingTarget(true);
      setIsLoadingTargetVehicle(true);

      fetchVehicleById(targetVehicleId)
        .then((vehicle) => {
          setTargetVehicle(vehicle);
          setSelectedVehicle(vehicle);
          setShowVehicleProfile(true);
          setIsLoadingTargetVehicle(false);
          onVehicleViewed?.();
        })
        .catch(() => {
          setIsLoadingTargetVehicle(false);
        })
        .finally(() => {
          setIsFetchingTarget(false);
        });
    }
  }, [targetVehicleId]);

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
    priceRange[0] === 0 &&
    priceRange[1] === 0 &&
    selectedCountry === null;

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
    setPriceRange([0, 0]);
    setSelectedFuelTypes([]);
    setSelectedCountry(null);
    setReset((prev) => !prev);

    dynamicHeaderRef.current?.showHeader();
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
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

  const handleViewDetails = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleProfile(true);
  }, []);

  const handleCloseVehicleProfile = useCallback(() => {
    setShowVehicleProfile(false);
    setSelectedVehicle(null);
    setIsLoadingTargetVehicle(false);
    setTargetVehicle(null);
  }, []);

  const handleNavigateToAuth = useCallback(() => {
    setShowVehicleProfile(false);
    setSelectedVehicle(null);
    toggleSales();
  }, [toggleSales]);

  const handleBackPress = useCallback(() => {
    if (isOwner) {
      router.push("/manage");
    } else {
      toggleSales();
    }
  }, [isOwner, toggleSales]);

  const renderVehicle = useCallback(
    ({ item, index }: { item: Vehicle; index: number }) => {
      const isLast = index === vehicles.length - 1;
      return (
        <SaleCard
          vehicle={item}
          isLast={isLast}
          onViewDetails={handleViewDetails}
        />
      );
    },
    [vehicles.length],
  );

  if (isLoadingTargetVehicle) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DynamicHeader
        ref={dynamicHeaderRef}
        headerBgColor="#F8FCFE"
        header={
          <View
            style={[
              {
                backgroundColor: "#F8FCFE",
                paddingBottom: 16,
              },
            ]}
          >
            <Header
              setShowFilterModal={(value: boolean) => setShowFilterModal(value)}
              setSearchTerm={(value: string) => setSearchTerm(value)}
              isVehicleList
              showBackButton={
                showBackButton ?? (!authState?.authenticated || isOwner)
              }
              onBack={handleBackPress}
            />

            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 5,
              }}
            >
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
              ref={flatListRef}
              onScroll={onScroll}
              scrollEventThrottle={scrollEventThrottle}
              data={vehicles}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => item?.id || `vehicle-${index}`}
              renderItem={renderVehicle}
              contentContainerStyle={[
                contentContainerStyle,
                {
                  gap: 20,
                  paddingHorizontal: 16,
                  paddingBottom: 24,
                },
              ]}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              maxToRenderPerBatch={10}
              initialNumToRender={10}
              windowSize={10}
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
        selectedCountry={selectedCountry}
        priceRange={priceRange}
        onToggleVehicleTypes={handleSetSelectedVehicleType}
        onToggleBrand={toggleBrand}
        onFuelToggle={(f) =>
          setSelectedFuelTypes((s) =>
            s.includes(f) ? s.filter((x) => x !== f) : [...s, f],
          )
        }
        onCountryChange={(country) => setSelectedCountry(country)}
        onPriceChange={handleValueChange}
        onApply={handleApplyFilter}
      />

      <ResetFAB
        visible={!isDefaultState && !showFilterModal}
        onPress={handleFilterReset}
      />

      <Modal
        visible={showVehicleProfile}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseVehicleProfile}
      >
        {selectedVehicle && (
          <VehicleProfileView
            vehicle={selectedVehicle}
            onClose={handleCloseVehicleProfile}
            onNavigateToAuth={handleNavigateToAuth}
          />
        )}
      </Modal>
    </View>
  );
};
