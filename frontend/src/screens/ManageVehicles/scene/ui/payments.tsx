import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { CustomButton } from "@/src/components/elements/button";

import { PaymentCard } from "./paymentCard";
import { AddModal } from "./addModal";
import { fetchPayments } from "../../actions";
import { styles } from "../styles/payments";

type PaymentsProps = {
  selectedVehicle: Vehicle | null;
  vehicleDriver: VehicleDriver;
  showAddPayModal: boolean;
  setShowAddPayModal: (show: boolean) => void;
};

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const Payments = ({
  selectedVehicle,
  vehicleDriver,
  showAddPayModal,
  setShowAddPayModal,
}: PaymentsProps) => {
  const { getCachedData } = useCustomQuery();
  const { paymentsPagination } = getCachedData(["paymentsPagination"]);

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const loadDriverPayments = (paymentsObj: PaymentsResponse) => {
    updateNestedPagination(
      vehicleDriver?.id,
      "paymentsPagination",
      paymentsObj.paginate,
    );

    const payments = paymentsObj?.data ?? [];

    updatePaginatedObject("userVehicles", selectedVehicle?.id!, {
      vehicle_drivers: [
        {
          ...vehicleDriver,
          payments: [...(vehicleDriver?.payments || []), ...payments],
        },
      ],
    });
  };

  const handleSetFetchedVehicleDriverPayments = (id: string) =>
    queryClient.setQueryData(
      ["fetchedVehicleDriverPayments"],
      (prev: VehicleDriver["id"][] = []) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      },
    );

  const handleFetchPayments = () => {
    const { pageParam } = onFetchNestedPagination(
      vehicleDriver?.id,
      "paymentsPagination",
    );

    fetchPayments({ pageParam, vehicleDriverId: vehicleDriver?.id }).then(
      (res: PaymentsResponse) => {
        loadDriverPayments(res);
      },
    );
  };

  useEffect(() => {
    if (!vehicleDriver?.id) return;

    const alreadyFetched = paymentsPagination?.some(
      (item: { id: string }) => item.id === vehicleDriver.id,
    );

    if (!alreadyFetched) {
      handleFetchPayments();
      handleSetFetchedVehicleDriverPayments(vehicleDriver.id);
    }
  }, [vehicleDriver?.id]);

  return (
    <>
      <CustomButton
        onPress={() => setShowAddPayModal(true)}
        style={styles.addPaymentRow}
      >
        <Text style={styles.addText}>+ ADD A PAYMENT</Text>
      </CustomButton>

      <FlatList
        data={vehicleDriver?.payments}
        onEndReached={() => {
          const paginationObj = paymentsPagination?.find(
            (item: { id: string }) => item.id === vehicleDriver?.id,
          )?.paginate;

          if ((paginationObj?.page ?? 0) < paginationObj?.max_page) {
            handleFetchPayments();
          }
        }}
        onEndReachedThreshold={0.4}
        keyExtractor={({ id }, index) => String(id + index)}
        renderItem={({ item }) => (
          <PaymentCard payment={item} vehicleDriver={vehicleDriver} />
        )}
        contentContainerStyle={{ paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
      />

      {showAddPayModal && selectedVehicle?.id && (
        <AddModal
          setShowAddPayModal={() => setShowAddPayModal(false)}
          vehicleId={selectedVehicle.id}
          vehicleDriver={vehicleDriver}
        />
      )}
    </>
  );
};
