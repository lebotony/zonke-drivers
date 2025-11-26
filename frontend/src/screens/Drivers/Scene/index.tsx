import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";

import { isEmpty } from "lodash";
import { useDebounce } from "use-debounce";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import { DynamicHeader } from "@/src/components/dynamicHeader";
import { Colors } from "@/constants/ui";

import { fetchDrivers } from "../actions";
import { Header } from "./ui/header";
import { QuickFilters } from "./ui/quickFilters";
import { DriverCard } from "./ui/driverCard";
import { FilterModal } from "./ui/filter";

export const Scene = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedLicences, setSelectedLicences] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 70]);
  const [experienceRange, setExperienceRange] = useState([0, 52]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const resetRef = useRef<boolean>(undefined);
  const didMountRef = useRef(false);

  const queryClient = useQueryClient();

  const filterParams = {
    platforms: selectedPlatforms,
    licences: selectedLicences,
    age_range: ageRange,
    experience_range: experienceRange,
    rating_range: selectedRating,
  };

  const getFilters = () => {
    if (applyFilter) return filterParams;

    if (!reset && !showFilterModal) return filterParams;

    return {};
  };

  const queryKey = ["drivers"];

  const queryFn = ({ pageParam = 1 }) => {
    const filters = {
      search_term: debouncedSearchTerm,
      ...getFilters(),
    };

    if (applyFilter) {
      setApplyFilter(false);
    }

    if (resetRef.current === true) resetRef.current = false;

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
  }, [selectedPlatforms]);

  useEffect(() => {
    if (reset) {
      queryClient.removeQueries({ queryKey });
      refetch();
      setReset(false);
    }
  }, [reset]);

  const isDefaultState =
    selectedLicences.length === 0 &&
    selectedPlatforms.length === 0 &&
    selectedRating === null &&
    ageRange[0] === 18 &&
    ageRange[1] === 70 &&
    experienceRange[0] === 0 &&
    experienceRange[1] === 52;

  const handleSetSelectedPlatforms = (value: string) => {
    if (selectedPlatforms.includes(value)) {
      const newPlatforms = selectedPlatforms.filter(
        (platform) => platform !== value
      );

      return setSelectedPlatforms(newPlatforms);
    }
    return setSelectedPlatforms((prev) => [...(prev || []), value]);
  };

  const handleSetSelectedLicences = (value: string) => {
    if (selectedLicences.includes(value)) {
      const newLicences = selectedLicences.filter(
        (licence) => licence !== value
      );

      return setSelectedLicences(newLicences);
    }
    return setSelectedLicences((prev) => [...(prev || []), value]);
  };

  const handleAgeChange = useCallback((low: number, high: number) => {
    setAgeRange([low, high]);
  }, []);

  const handleExperienceChange = useCallback((low: number, high: number) => {
    setExperienceRange([low, high]);
  }, []);

  const handleApplyFilter = () => {
    setApplyFilter(true);
    setShowFilterModal(false);
  };

  const onFilterDismiss = () => {
    setShowFilterModal(false);
  };

  const handleFilterReset = () => {
    resetRef.current = true;

    setSelectedLicences([]);
    setSelectedPlatforms([]);
    setApplyFilter(false);
    setSelectedRating(null);
    setAgeRange([18, 70]);
    setExperienceRange([0, 52]);

    setReset((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <DynamicHeader
        headerBgColor={Colors.bg}
        header={
          <View>
            <Header
              setShowFilterModal={(value: boolean) => setShowFilterModal(value)}
              setSearchTerm={(value: string) => setSearchTerm(value)}
            />
            <QuickFilters
              showReset={!isDefaultState}
              onSetSelectedPlatforms={(value: string) =>
                handleSetSelectedPlatforms(value)
              }
              selectedPlatforms={selectedPlatforms}
              onClear={handleFilterReset}
            />
          </View>
        }
      >
        {({ onScroll, scrollEventThrottle, contentContainerStyle }) =>
          isEmpty(drivers) && !isLoading ? (
            <NoData />
          ) : isLoading ? (
            <Spinner />
          ) : (
            <FlatList
              data={drivers}
              onScroll={onScroll}
              scrollEventThrottle={scrollEventThrottle}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => String(item?.id + index)}
              renderItem={({ item }) => <DriverCard driver={item} />}
              contentContainerStyle={[
                contentContainerStyle,
                { gap: 15, paddingVertical: 15 },
              ]}
            />
          )
        }
      </DynamicHeader>

      <FilterModal
        showReset={!isDefaultState}
        visible={showFilterModal}
        onDismiss={onFilterDismiss}
        onReset={handleFilterReset}
        selectedPlatforms={selectedPlatforms}
        selectedLicences={selectedLicences}
        selectedRating={selectedRating}
        ageRange={ageRange}
        experienceRange={experienceRange}
        onAgeChange={handleAgeChange}
        onExperienceChange={handleExperienceChange}
        onRatingSelect={setSelectedRating}
        onApply={handleApplyFilter}
        onTogglePlatforms={handleSetSelectedPlatforms}
        onToggleLicences={handleSetSelectedLicences}
      />
    </View>
  );
};
