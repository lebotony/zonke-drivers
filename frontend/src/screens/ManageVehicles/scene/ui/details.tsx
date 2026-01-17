import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { useLocalSearchParams, useRouter } from "expo-router";
import { find } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { Comments } from "@/src/screens/ViewSection/scene/ui/comments";
import { CommentModal } from "@/src/screens/ViewSection/scene/ui/commentModal";
import { Colors } from "@/constants/ui";
import { Avatar } from "@/src/components/visual/avatar";

import { PaymentCard } from "./paymentCard";
import { fetchPayments } from "../../actions";
import { AddModal } from "./addModal";
import { styles } from "../styles/details";

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

export const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState("payments");
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
      paymentsObj.paginate,
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
      ],
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
    if (!fetchedVehicleDriverPayments?.includes(vehicleDriver?.id)) {
      handleFetchPayments();
      handleSetFetchedVehicleDriverPayments(vehicleDriver?.id);
    }
  }, [userVehicles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.darkCharcoalGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
      </View>

      <View style={styles.tabSwitcherContainer}>
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tab, switchSelection === "payments" && styles.tabActive]}
            onPress={() => setSwitchSelection("payments")}
            activeOpacity={0.8}
          >
            <Text style={switchSelection === "payments" ? styles.tabTextActive : styles.tabText}>
              Payments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, switchSelection === "comments" && styles.tabActive]}
            onPress={() => setSwitchSelection("comments")}
            activeOpacity={0.8}
          >
            <Text style={switchSelection === "comments" ? styles.tabTextActive : styles.tabText}>
              Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.driverCard}>
        <Avatar source={vehicleDriver?.driver?.asset_url} width={50} round />
        <Text style={styles.nameText}>
          {vehicleDriver?.driver?.first_name} {vehicleDriver?.driver?.last_name}
        </Text>
      </View>

      {switchSelection === "payments" && (
        <>
          <TouchableOpacity
            style={styles.addPaymentButton}
            onPress={() => setShowAddPayModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={22} color={Colors.white} />
            <Text style={styles.addText}>ADD PAYMENT</Text>
          </TouchableOpacity>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Payment History</Text>
          </View>

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
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyStateIconContainer}>
                  <Ionicons name="wallet-outline" size={40} color={Colors.mrDBlue} />
                </View>
                <Text style={styles.emptyStateTitle}>No Payments Yet</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Payments made by this driver will appear here
                </Text>
              </View>
            }
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
