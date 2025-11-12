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
import { Avatar } from "@/src/components/visual/avatar";

import { PaymentCard } from "./paymentCard";
import { fetchPayments } from "../../actions";
import { styles } from "../styles/payments";
import { AddModal } from "./addModal";
import { switchItems } from "../constants";
import { VehicleSelector } from "./vehicleSelector";

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const initialVehicleId = Array.isArray(id) ? id[0] : id;
  const { getCachedData } = useCustomQuery();

  const { userVehicles, fetchedVehicleDriverPayments, paymentsPagination } =
    getCachedData([
      "paymentsPagination",
      "userVehicles",
      "fetchedVehicleDriverPayments",
    ]);

  const initialVehicle: Vehicle = find(userVehicles, { id: initialVehicleId });
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState(switchItems[0].slug);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(initialVehicle);

  const vehicleDriver: VehicleDriver = find(userVehicles, { id: selectedVehicle.id })
    ?.vehicle_drivers?.[0];

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    getUpdatedObjectSnapshot,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const loadDriverPayments = (paymentsObj: PaymentsResponse) => {
    const vehicleId = selectedVehicle?.id;
    updateNestedPagination(
      vehicleDriver?.id,
      "paymentsPagination",
      paymentsObj.paginate
    );

    const payments = paymentsObj?.data ?? [];

    updatePaginatedObject("userVehicles", vehicleId, {
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
      (fetchedVehicleDriverPayments: VehicleDriver["id"][]) => [
        ...(fetchedVehicleDriverPayments ?? []),
        id,
      ]
    );

  const handleFetchPayments = () => {
    const { pageParam } = onFetchNestedPagination(
      vehicleDriver?.id,
      "paymentsPagination"
    );

    fetchPayments({ pageParam, vehicleDriverId: vehicleDriver?.id }).then(
      (res: PaymentsResponse) => {
        loadDriverPayments(res);
      }
    );
  };

  useEffect(() => {
    if (!fetchedVehicleDriverPayments?.includes(vehicleDriver?.id)) {
      handleFetchPayments();
      handleSetFetchedVehicleDriverPayments(vehicleDriver?.id);
    }
  }, [userVehicles]);

  return (
    <SafeAreaView style={styles.container}>
      <InlineSwitch
        shadowColor={Colors.whiteSmoke}
        items={switchItems}
        selectedColor={Colors.mrDBlue}
        value={switchSelection}
        onChange={setSwitchSelection}
      />


      <View style={{paddingHorizontal: 14,marginTop: 8, backgroundColor: Colors.white}}>
        <VehicleSelector
            vehicles={userVehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
        />
      </View>


      {switchSelection === "payments" && (
        <View style={{marginTop: 8}}>
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
            keyExtractor={({ id }, index) => String(id + index)}
            renderItem={({ item }) => (
              <PaymentCard payment={item} vehicleDriver={vehicleDriver} />
            )}
            contentContainerStyle={{ paddingVertical: 5 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {switchSelection === "comments" && (
        <Comments
          driverId={vehicleDriver?.driver?.id}
          vehicleId={selectedVehicle.id}
          setShowCommentModal={() => setShowCommentModal(true)}
        />
      )}
      {showCommentModal && (
        <CommentModal
          driverId={vehicleDriver?.driver?.id}
          vehicle={selectedVehicle}
          setShowCommentModal={() => setShowCommentModal(false)}
        />
      )}
      {showAddPayModal && (
        <AddModal
          setShowAddPayModal={() => setShowAddPayModal(false)}
          vehicleId={selectedVehicle.id}
          vehicleDriver={vehicleDriver}
        />
      )}
    </SafeAreaView>
  );
};
