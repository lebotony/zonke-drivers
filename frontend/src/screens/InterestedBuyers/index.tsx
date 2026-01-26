import React, { useEffect } from "react";
import { FlatList, SafeAreaView, View, TouchableOpacity, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { useNavigation } from "expo-router";

import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

import { NoData } from "@/src/components/NoData";
import { Spinner } from "@/src/components/elements/Spinner";
import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { fetchInterestedBuyers, markInterestsAsSeen } from "./actions";
import { styles } from "./styles";
import { createThread } from "../DriverProfile/actions";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { find } from "lodash";

type BuyerCardProps = {
  interest: any;
  onMessage: (userId: string) => void;
};

const BuyerCard = ({ interest, onMessage }: BuyerCardProps) => {
  const user = interest.user;

  return (
    <View style={styles.card}>
      <View style={styles.userSection}>
        <Avatar round width={50} source={user?.asset?.url} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.first_name} {user.last_name}
          </Text>
          {user.location && (
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={Colors.mediumGrey} />
              <Text style={styles.locationText}>
                {user.location.city}, {user.location.country}
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => onMessage(user.id)}
        activeOpacity={0.7}
      >
        <Ionicons name="chatbubble-outline" size={18} color={Colors.white} />
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export const InterestedBuyers = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;
  const navigation = useNavigation();

  const { addItemToPaginatedList, updatePaginatedObject } = usePaginatedCache();
  const { getCachedData } = useCustomQuery();
  const { threads = [] } = getCachedData(["threads"]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["interestedBuyers", vehicleId],
      queryFn: ({ pageParam = 1 }) =>
        fetchInterestedBuyers(vehicleId, { pageParam }),
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page;

        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const interests = data?.pages?.flatMap((page) => page?.data) ?? [];

  useEffect(() => {
    if (vehicleId) {
      markInterestsAsSeen(vehicleId)
        .then(() => {
          updatePaginatedObject("userVehicles", vehicleId, {
            buyers_count: 0,
          });
        })
        .catch((err) => {
          console.error("Failed to mark interests as seen:", err);
        });
    }
  }, [vehicleId]);

  const handleMessage = (userId: string) => {
    createThread({ participant_id: userId })
      .then((response) => {
        if (!find(threads, { id: response.id })) {
          addItemToPaginatedList("threads", response);
        }
        router.push(`/chats/${response.id}`);
      })
      .catch((err) => {
        console.error("Create thread error:", err);
        AppToast("Failed to create conversation");
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && { backgroundColor: "rgba(0, 0, 0, 0.05)" },
            ]}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.darkCharcoalGrey}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Interested Buyers</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        {isEmpty(interests) && !isLoading ? (
          <View style={styles.emptyContainer}>
            <NoData />
            <Text style={styles.emptyText}>
              No one has expressed interest yet
            </Text>
          </View>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={interests}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BuyerCard interest={item} onMessage={handleMessage} />
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};
