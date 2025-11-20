import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";

import { find } from "lodash";

import { useQueryClient } from "@tanstack/react-query";

import { CustomButton } from "@/src/components/elements/button";
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
  const { userVehicles, commentsPagination, fetchedVehicleDriverComments } =
    getCachedData([
      "userVehicles",
      "commentsPagination",
      "fetchedVehicleDriverComments",
    ]);

  const vehicle = find(userVehicles, { id: vehicleId });
  const vehicleDriver = vehicle?.vehicle_drivers?.find(
    (vd: VehicleDriver) => vd?.driver?.id === driverId
  );

  const loadDriverComments = (commentsObj: Record<string, any>) => {
    updateNestedPagination(
      vehicleDriver?.id,
      "commentsPagination",
      commentsObj.paginate
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

  const handleSetFetchedComments = () =>
    queryClient.setQueryData(
      ["fetchedVehicleDriverComments"],
      (fetchedVehicleDriverComments: Driver["id"][]) => [
        ...(fetchedVehicleDriverComments ?? []),
        { driverId, vehicleId },
      ]
    );

  const handleFetchComments = () => {
    const { pageParam } = onFetchNestedPagination(
      vehicleDriver?.id,
      "commentsPagination"
    );

    fetchComments({
      pageParam,
      driverId,
    }).then((res) => {
      loadDriverComments(res);
    });
  };

  useEffect(() => {
    if (
      !fetchedVehicleDriverComments?.includes({ driverId, vehicleId }) ||
      !driverId ||
      !vehicleId
    ) {
      handleFetchComments();
      handleSetFetchedComments();
    }
  }, []);

  return (
    <View style={styles.commentsSection}>
      <CustomButton onPress={setShowCommentModal} style={styles.addCommentRow}>
        <Text style={styles.addCommentText}>+ ADD A COMMENT</Text>
      </CustomButton>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={vehicleDriver?.comments}
        onEndReached={() => {
          const paginationObj = find(commentsPagination, {
            id: vehicleDriver?.id,
          })?.paginate;

          if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
            handleFetchComments();
          }
        }}
        keyExtractor={(v, index) => String(index)}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    </View>
  );
};
