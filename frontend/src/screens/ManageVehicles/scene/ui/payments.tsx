import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { find, isEmpty } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { Comments } from "@/src/screens/ViewSection/scene/ui/comments";
import { CommentModal } from "@/src/screens/ViewSection/scene/ui/commentModal";

import { PaymentCard } from "./paymentCard";
import { fetchPayments } from "../../actions";
import { styles } from "../styles/payments";

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleDriverId = Array.isArray(id) ? id[0] : id;

  const [showCommentModal, setShowCommentModal] = useState(false);

  const { getCachedData } = useCustomQuery();
  const { vehicleDrivers, fetchedVehicleDriverIds, paymentsPagination } =
    getCachedData([
      "paymentsPagination",
      "vehicleDrivers",
      "fetchedVehicleDriverIds",
    ]);

  const vehicleDriver = find(vehicleDrivers, { id: vehicleDriverId });

  const queryClient = useQueryClient();
  const { updatePaginatedObject } = usePaginatedCache();

  const loadDriverPayments = (paymentsObj: PaymentsResponse) => {
    queryClient.setQueryData(["paymentsPagination"], paymentsObj.paginate);

    const payments = paymentsObj?.data;

    if (Array.isArray(payments) && !isEmpty(payments)) {
      updatePaginatedObject("vehicleDrivers", vehicleDriverId, {
        payments: payments,
      });
    }
  };

  const handleSetFetchedVehicleDrivers = (id: string) =>
    queryClient.setQueryData(
      ["fetchedVehicleDriverIds"],
      (fetchedVehicleDriverIds: VehicleDriver["id"][]) => [
        ...(fetchedVehicleDriverIds ?? []),
        id,
      ]
    );

  const handleFetchPayments = () => {
    const page = paymentsPagination?.page;
    const max_page = paymentsPagination?.max_page;
    const pageParam = page < max_page ? page + 1 : undefined;

    fetchPayments({ pageParam, vehicleDriverId }).then(
      (res: PaymentsResponse) => {
        loadDriverPayments(res);
      }
    );
  };

  useEffect(() => {
    if (!fetchedVehicleDriverIds?.includes(vehicleDriverId)) {
      handleFetchPayments();
      handleSetFetchedVehicleDrivers(vehicleDriverId);
    }
  }, [vehicleDrivers]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Payments</Text>

      <View
        style={{
          alignItems: "flex-end",
          marginRight: 15,
        }}
      >
        <Text style={styles.addText}>+ Add</Text>
      </View>

      <FlatList
        data={vehicleDriver.payments}
        onEndReached={() => {
          if (paymentsPagination?.page < paymentsPagination?.max_page) {
            handleFetchPayments();
          }
        }}
        keyExtractor={({ id }, _index) => String(id)}
        renderItem={({ item }) => (
          <PaymentCard payment={item} vehicleDriver={vehicleDriver} />
        )}
        contentContainerStyle={{ paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
      />

      <Comments setShowCommentModal={() => setShowCommentModal(true)} />

      {showCommentModal && (
        <CommentModal setShowCommentModal={() => setShowCommentModal(false)} />
      )}
    </SafeAreaView>
  );
};
