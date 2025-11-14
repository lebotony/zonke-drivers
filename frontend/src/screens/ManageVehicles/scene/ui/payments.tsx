import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { find } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { Comments } from "@/src/screens/ViewSection/scene/ui/comments";
import { CommentModal } from "@/src/screens/ViewSection/scene/ui/commentModal";
import { InlineSwitch } from "@/src/components/misc/inlineSwitch";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";

import { VehicleSelector } from "./vehicleSelector";
import { PaymentCard } from "./paymentCard";
import { fetchPayments } from "../../actions";
import { styles } from "../styles/payments";
import { AddModal } from "./addModal";
import { switchItems } from "../constants";

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const initialVehicleId = Array.isArray(id) ? id[0] : id;

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState(switchItems[0].slug);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { getCachedData } = useCustomQuery();

  const { userVehicles, fetchedVehicleDriverPayments, paymentsPagination } =
    getCachedData([
      "paymentsPagination",
      "userVehicles",
      "fetchedVehicleDriverPayments",
    ]);

  useEffect(() => {
    if (!selectedVehicle && userVehicles?.length) {
      const initial =
        find(userVehicles, { id: initialVehicleId }) || userVehicles[0];
      setSelectedVehicle(initial);
    }
  }, [userVehicles, selectedVehicle, initialVehicleId]);

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const vehicleDriver: VehicleDriver = find(userVehicles, {
    id: selectedVehicle?.id,
  })?.vehicle_drivers?.[0];

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

    const alreadyFetched = fetchedVehicleDriverPayments?.includes(
      vehicleDriver.id,
    );
    if (!alreadyFetched) {
      handleFetchPayments();
      handleSetFetchedVehicleDriverPayments(vehicleDriver.id);
    }
  }, [vehicleDriver?.id]);

  return (
    <SafeAreaView style={styles.container}>
      <InlineSwitch
        shadowColor={Colors.whiteSmoke}
        items={switchItems}
        selectedColor={Colors.mrDBlue}
        value={switchSelection}
        onChange={setSwitchSelection}
      />

      <View
        style={{
          paddingHorizontal: 14,
          marginTop: 8,
          backgroundColor: Colors.white,
        }}
      >
        <VehicleSelector
          vehicles={userVehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={(vehicle: Vehicle) => {
            setSelectedVehicle(vehicle);
          }}
        />
      </View>

      {switchSelection === "payments" && (
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
              const paginationObj = find(paymentsPagination, {
                id: vehicleDriver?.id,
              })?.paginate;

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
        </>
      )}

      {switchSelection === "comments" &&
        vehicleDriver?.driver?.id &&
        selectedVehicle?.id && (
          <Comments
            driverId={vehicleDriver.driver.id}
            vehicleId={selectedVehicle.id}
            setShowCommentModal={() => setShowCommentModal(true)}
          />
        )}

      {showCommentModal && vehicleDriver?.driver?.id && selectedVehicle && (
        <CommentModal
          driverId={vehicleDriver.driver.id}
          vehicle={selectedVehicle}
          setShowCommentModal={() => setShowCommentModal(false)}
        />
      )}

      {/* ➕ ADD PAYMENT MODAL */}
      {showAddPayModal && selectedVehicle?.id && (
        <AddModal
          setShowAddPayModal={() => setShowAddPayModal(false)}
          vehicleId={selectedVehicle.id}
          vehicleDriver={vehicleDriver}
        />
      )}
    </SafeAreaView>
  );
};
