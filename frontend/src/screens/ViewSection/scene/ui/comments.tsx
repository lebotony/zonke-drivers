import { useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { find } from "lodash";

import { useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "../styles/comments";
import { Comment } from "./comment";
import { fetchComments } from "../../actions";

type CommentsProps = {
  setShowCommentModal: VoidCallback;
  driverId: string;
  vehicleId: string;
};

export const Comments = (props: CommentsProps) => {
  const { setShowCommentModal, driverId, vehicleId } = props;

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    getUpdatedObjectSnapshot,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { userVehicles, commentsPagination, fetchedDriverComments } =
    getCachedData([
      "userVehicles",
      "commentsPagination",
      "fetchedDriverComments",
    ]);

  const vehicle = find(userVehicles, { id: vehicleId });
  const vehicleDriver = vehicle?.vehicle_drivers?.find(
    (vd: VehicleDriver) => vd?.driver?.id === driverId,
  );

  const vehicleDriverKey = `${vehicleId}-${driverId}`;

  const loadDriverComments = (commentsObj: Record<string, any>) => {
    updateNestedPagination(
      vehicleDriverKey,
      "commentsPagination",
      commentsObj.paginate,
    );

    const driverComments = commentsObj?.data;

    const vehicle = getUpdatedObjectSnapshot("userVehicles", vehicleId);

    updatePaginatedObject("userVehicles", vehicleId, {
      vehicle_drivers: vehicle?.vehicle_drivers?.map((vd) => {
        if (vd?.driver.id !== driverId) return vd;

        return {
          ...vd,
          comments: [...(vd?.comments ?? []), ...(driverComments ?? [])],
        };
      }),
    });
  };

  const handleSetFetchedComments = (key: string) =>
    queryClient.setQueryData(
      ["fetchedDriverComments"],
      (prev: string[] = []) => {
        if (prev.includes(key)) return prev;
        return [...prev, key];
      },
    );

  const handleFetchComments = () => {
    const { pageParam } = onFetchNestedPagination(
      vehicleDriverKey,
      "commentsPagination",
    );

    fetchComments({
      pageParam,
      driverId,
    }).then((res) => {
      loadDriverComments(res);
    });
  };

  useEffect(() => {
    if (!vehicleDriverKey) return;

    const alreadyFetched = fetchedDriverComments?.includes(vehicleDriverKey);

    if (!alreadyFetched) {
      handleFetchComments();
      handleSetFetchedComments(vehicleDriverKey);
    }
  }, [vehicleDriverKey]);

  return (
    <View style={styles.commentsSection}>
      <TouchableOpacity
        style={styles.addCommentRow}
        onPress={setShowCommentModal}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={22} color={Colors.white} />
        <Text style={styles.addCommentText}>ADD COMMENT</Text>
      </TouchableOpacity>

      {vehicleDriver?.comments ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={vehicleDriver?.comments}
          onEndReached={() => {
            const paginationObj = find(commentsPagination, {
              id: vehicleDriverKey,
            })?.paginate;

            if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
              handleFetchComments();
            }
          }}
          keyExtractor={(v, index) => String(index)}
          renderItem={({ item }) => <Comment comment={item} />}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="card-outline" size={64} color="#ddd" />
          <Text style={styles.emptyStateTitle}>No comments added yet</Text>
        </View>
      )}
    </View>
  );
};
