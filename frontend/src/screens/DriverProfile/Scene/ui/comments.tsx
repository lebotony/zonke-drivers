import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";

import { find, isEmpty } from "lodash";

import { useQueryClient } from "@tanstack/react-query";

import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Comment } from "@/src/screens/ViewSection/scene/ui/comment";
import { BackArrow } from "@/src/components/BackArrow/header";

import { fetchComments } from "../../actions";
import { styles } from "../styles/comments";
import { IS_IOS } from "@/constants/srcConstants";
import { topOffsetHeight } from "@/src/components/appStyles";

export const CommentsScreen = () => {
  const { id } = useLocalSearchParams();
  const driverId = Array.isArray(id) ? id[0] : id;

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const {
    drivers,
    driverProfile,
    driversCommentsPagination,
    fetchedDriversListComments,
  } = getCachedData([
    "drivers",
    "driverProfile",
    "driversCommentsPagination",
    "fetchedDriversListComments",
  ]);

  const isUserProfile = driverProfile?.id === driverId;
  let driver = isUserProfile ? driverProfile : find(drivers, { id: driverId });

  const loadDriverComments = (commentsObj: Record<string, any>) => {
    updateNestedPagination(
      driverId,
      "driversCommentsPagination",
      commentsObj.paginate,
    );

    const driverComments = commentsObj?.data;

    if (!isUserProfile) {
      updatePaginatedObject("drivers", driverId, {
        comments: [...(driver?.comments ?? []), ...(driverComments ?? [])],
      });
    } else {
      queryClient.setQueryData(["driverProfile"], {
        ...driverProfile,
        comments: [
          ...(driverProfile?.comments ?? []),
          ...(driverComments ?? []),
        ],
      });
    }
  };

  const handleSetFetchedComments = (id: string) =>
    queryClient.setQueryData(
      ["fetchedDriversListComments"],
      (fetchedDriversListComments: Vehicle["id"][]) => [
        ...(fetchedDriversListComments ?? []),
        id,
      ],
    );

  const handleFetchComments = () => {
    const { pageParam } = onFetchNestedPagination(
      driverId,
      "driversCommentsPagination",
    );

    fetchComments({
      pageParam,
      driverId: driverId,
    }).then((res) => {
      loadDriverComments(res);
    });
  };

  useEffect(() => {
    if (!fetchedDriversListComments?.includes(driverId) || !driverId) {
      handleFetchComments();
      handleSetFetchedComments(driverId);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BackArrow left={20} top={topOffsetHeight + 6} />

      {isEmpty(driver?.comments) ? (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIcon}>
            <Text style={styles.emptyStateEmoji}>💬</Text>
          </View>
          <Text style={styles.emptyStateTitle}>No Comments Yet</Text>
          <Text style={styles.emptyStateSubtitle}>
            Be the first to share your thoughts
          </Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.pageTitle}>Comments</Text>
            <View style={styles.commentCountBadge}>
              <Text style={styles.commentCountText}>
                {driver?.comments?.length || 0}
              </Text>
            </View>
          </View>

          <FlatList
            contentContainerStyle={styles.listContent}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={driver?.comments}
            onEndReached={() => {
              const paginationObj = find(driversCommentsPagination, {
                id: driverId,
              })?.paginate;

              if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
                handleFetchComments();
              }
            }}
            keyExtractor={(v, index) => String(index)}
            renderItem={({ item }) => <Comment comment={item} />}
          />
        </View>
      )}
    </View>
  );
};
