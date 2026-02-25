import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Avatar } from "@/src/components/visual/avatar";
import { Spinner } from "@/src/components/elements/Spinner";
import { VehicleCard } from "@/src/screens/Vehicles/scene/ui/card";
import { SaleCard } from "@/src/screens/VehicleSales/scene/ui/SaleCard";
import { VehicleProfileView } from "@/src/screens/VehicleSales/scene/ui/VehicleProfileView";
import { Colors } from "@/constants/ui";

import { fetchOwnerVehicles } from "./actions";
import { styles } from "./styles";

type OwnerVehiclesCache = {
  renting: Vehicle[];
  forSale: Vehicle[];
};

const CACHE_EMPTY: OwnerVehiclesCache = { renting: [], forSale: [] };

export const OwnerProfile = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [onSale, setOnSale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Tracks whether each tab has been attempted, avoiding duplicate requests.
  const fetchedRef = useRef({ renting: false, forSale: false });

  const queryClient = useQueryClient();
  const queryKey = ["owner_vehicles", id];

  // Subscribe to the shared cache. Re-renders whenever setQueryData is called
  // for this key — enabled:false means the queryFn never fires automatically.
  const { data: cache = CACHE_EMPTY } = useQuery<OwnerVehiclesCache>({
    queryKey,
    queryFn: () => CACHE_EMPTY,
    enabled: false,
    initialData: CACHE_EMPTY,
    staleTime: Infinity,
  });

  const fetchTab = useCallback(
    (isSale: boolean) => {
      const key = isSale ? "forSale" : "renting";

      // Skip if already fetched this session.
      // Also skip if the cache already has data (e.g. after navigating back).
      if (fetchedRef.current[key]) return;
      const current = queryClient.getQueryData<OwnerVehiclesCache>(queryKey);
      if ((current?.[key]?.length ?? 0) > 0) {
        fetchedRef.current[key] = true;
        return;
      }

      fetchedRef.current[key] = true;
      setIsLoading(true);

      fetchOwnerVehicles({ pageParam: 1 }, id, isSale)
        .then((res) => {
          queryClient.setQueryData<OwnerVehiclesCache>(queryKey, (prev) => ({
            renting: prev?.renting ?? [],
            forSale: prev?.forSale ?? [],
            [key]: res.data ?? [],
          }));
        })
        .catch(() => {
          // Allow retry on error
          fetchedRef.current[key] = false;
        })
        .finally(() => setIsLoading(false));
    },
    [id, queryClient],
  );

  // Fetch renting vehicles on mount
  useEffect(() => {
    fetchTab(false);
  }, [fetchTab]);

  const handleToggle = (value: boolean) => {
    if (value === onSale) return;
    setOnSale(value);
    fetchTab(value);
  };

  const vehicles = onSale ? cache.forSale : cache.renting;
  const owner = cache.renting[0]?.user ?? cache.forSale[0]?.user;
  const ownerName = owner
    ? `${owner.first_name ?? ""} ${owner.last_name ?? ""}`.trim()
    : "";

  const renderVehicle = useCallback(
    ({ item, index }: { item: Vehicle; index: number }) => {
      const isLast = index === vehicles.length - 1;
      if (onSale) {
        return (
          <SaleCard
            vehicle={item}
            isLast={isLast}
            onViewDetails={(v) => setSelectedVehicle(v)}
          />
        );
      }
      return <VehicleCard vehicle={item} isLast={isLast} />;
    },
    [vehicles.length, onSale],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.avatarRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={Colors.darkCharcoalGrey}
            />
          </TouchableOpacity>
          <Avatar round width={72} source={owner?.asset?.url} />
        </View>
        {ownerName ? <Text style={styles.ownerName}>{ownerName}</Text> : null}

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, !onSale && styles.toggleButtonActive]}
            onPress={() => handleToggle(false)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.toggleText, !onSale && styles.toggleTextActive]}
            >
              Renting
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, onSale && styles.toggleButtonActive]}
            onPress={() => handleToggle(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.toggleText, onSale && styles.toggleTextActive]}
            >
              For Sale
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <Spinner />
      ) : vehicles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={48} color={Colors.mediumGrey} />
          <Text style={styles.emptyText}>
            No {onSale ? "vehicles for sale" : "rental vehicles"} listed
          </Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item, index) => item?.id || `v-${index}`}
          renderItem={renderVehicle}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {selectedVehicle && (
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <VehicleProfileView
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            onNavigateToAuth={() => setSelectedVehicle(null)}
          />
        </View>
      )}
    </View>
  );
};
