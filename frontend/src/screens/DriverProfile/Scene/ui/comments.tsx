import { useEffect } from "react";
import { View, FlatList } from "react-native";

import { find } from "lodash";

import { useQueryClient } from "@tanstack/react-query";

import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { fetchComments } from "../../actions";
import { styles } from "../styles/comments";
import { Comment } from "@/src/screens/ViewSection/scene/ui/comment";

type CommentsProps = {
  driver: Driver;
};

export const Comments = (props: CommentsProps) => {
  const { driver } = props;

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { driversCommentsPagination, fetchedDriversListComments } =
    getCachedData(["driversCommentsPagination", "fetchedDriversListComments"]);

  const loadDriverComments = (commentsObj: Record<string, any>) => {
    updateNestedPagination(
      driver?.id,
      "driversCommentsPagination",
      commentsObj.paginate
    );

    const driverComments = commentsObj?.data;

    updatePaginatedObject("drivers", driver?.id, {
      comments: [...(driver?.comments ?? []), ...(driverComments ?? [])],
    });
  };

  const handleSetFetchedComments = (id: string) =>
    queryClient.setQueryData(
      ["fetchedDriversListComments"],
      (fetchedDriversListComments: Vehicle["id"][]) => [
        ...(fetchedDriversListComments ?? []),
        id,
      ]
    );

  const handleFetchComments = () => {
    const { pageParam } = onFetchNestedPagination(
      driver?.id,
      "driversCommentsPagination"
    );

    fetchComments({
      pageParam,
      driverId: driver?.id,
    }).then((res) => {
      loadDriverComments(res);
    });
  };

  useEffect(() => {
    if (!fetchedDriversListComments?.includes(driver?.id) || !driver?.id) {
      handleFetchComments();
      handleSetFetchedComments(driver?.id);
    }
  }, []);

  return (
    <View style={styles.commentsSection}>
      <FlatList
        nestedScrollEnabled
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        data={driver?.comments}
        onEndReached={() => {
          const paginationObj = find(driversCommentsPagination, {
            id: driver?.id,
          })?.paginate;

          if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
            handleFetchComments();
          }
        }}
        keyExtractor={(v, index) => String(index)}
        renderItem={({ item }) => <Comment comment={item} />}
        style={{ maxHeight: 400 }}
      />
    </View>
  );
};
