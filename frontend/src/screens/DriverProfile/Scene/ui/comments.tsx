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
    <View style={styles.commentsSection}>
      <BackArrow left={20} top={topOffsetHeight + 3} />
      {isEmpty(driver?.comments) ? (
        <View style={styles.noCommentsWrapper}>
          <Text style={styles.noCommentsText}>No comments</Text>
        </View>
      ) : (
        <>
          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
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
        </>
      )}
    </View>
  );
};
