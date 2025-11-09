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

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState(switchItems[0].slug);
  const { getCachedData } = useCustomQuery();

  const { userVehicles, fetchedVehicleDriverPayments, paymentsPagination } =
    getCachedData([
      "paymentsPagination",
      "userVehicles",
      "fetchedVehicleDriverPayments",
    ]);

  const vehicle: Vehicle = find(userVehicles, { id: vehicleId });

  const vehicleDriver: VehicleDriver = find(userVehicles, { id: vehicleId })
    ?.vehicle_drivers?.[0];

  const queryClient = useQueryClient();
  const {
    updatePaginatedObject,
    getUpdatedObjectSnapshot,
    updateNestedPagination,
    onFetchNestedPagination,
  } = usePaginatedCache();

  const loadDriverPayments = (paymentsObj: PaymentsResponse) => {
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
      <View style={styles.driver}>
        <Avatar source={vehicleDriver?.driver?.asset_url} width={50} round />
        <Text style={styles.nameText}>
          {vehicleDriver?.driver?.first_name} {vehicleDriver?.driver?.last_name}
        </Text>
      </View>

      {/* <VehicleSelector
          vehicles={userVehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        /> */}

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
            keyExtractor={({ id }, index) => String(id + index)}
            renderItem={({ item }) => (
              <PaymentCard payment={item} vehicleDriver={vehicleDriver} />
            )}
            contentContainerStyle={{ paddingVertical: 5 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {switchSelection === "comments" && (
        <Comments
          driverId={vehicleDriver?.driver?.id}
          vehicleId={vehicleId}
          setShowCommentModal={() => setShowCommentModal(true)}
        />
      )}
      {showCommentModal && (
        <CommentModal
          driverId={vehicleDriver?.driver?.id}
          vehicle={vehicle}
          setShowCommentModal={() => setShowCommentModal(false)}
        />
      )}
      {showAddPayModal && (
        <AddModal
          setShowAddPayModal={() => setShowAddPayModal(false)}
          vehicleId={vehicleId}
          vehicleDriver={vehicleDriver}
        />
      )}
    </SafeAreaView>
  );
};
