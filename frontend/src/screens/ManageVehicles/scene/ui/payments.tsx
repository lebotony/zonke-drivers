import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";
import { find } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { Comments } from "@/src/screens/ViewSection/scene/ui/comments";
import { CommentModal } from "@/src/screens/ViewSection/scene/ui/commentModal";

import { PaymentCard } from "./paymentCard";
import { fetchPayments } from "../../actions";
import { styles } from "../styles/payments";
import { AddModal } from "./addModal";
import { InlineSwitch } from "@/src/components/misc/inlineSwitch";
import { Colors } from "@/constants/ui";
import { switchItems } from "../constants";
import { VehicleSelector } from "./vehicleSelector";
import { CustomButton } from "@/src/components/elements/button";

type PaymentsResponse = {
  data: Payment[];
  paginate: Paginate;
};

 const vehiclesData = [
    {
      id: '1',
      model: 'Toyota Camry 2020',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      type: 'Sedan',
      color: 'White',
      applicants: 12,
    },
    {
      id: '2',
      model: 'Mercedes E-Class 2021',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      type: 'Luxury Sedan',
      color: 'Black',
      applicants: 8,
    },
    {
      id: '3',
      model: 'Toyota Harrier 2019',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      type: 'SUV',
      color: 'Gray',
      applicants: 5,
    },
  ];


export const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const vehicleDriverId = Array.isArray(id) ? id[0] : id;

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState(switchItems[0].slug);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehiclesData[0]);

  const { getCachedData } = useCustomQuery();
  const { vehicleDrivers, fetchedVehicleDriverIds, paymentsPagination } =
    getCachedData([
      "paymentsPagination",
      "vehicleDrivers",
      "fetchedVehicleDriverIds",
    ]);

  const vehicleDriver = find(vehicleDrivers, { id: vehicleDriverId });

  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", vehicleDriver.payments);

  const queryClient = useQueryClient();
  const { updatePaginatedObject, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const loadDriverPayments = (paymentsObj: PaymentsResponse) => {
    queryClient.setQueryData(["paymentsPagination"], paymentsObj.paginate);

    const payments = paymentsObj?.data;

    const vehicleDriver = getUpdatedObjectSnapshot(
      "vehicleDrivers",
      vehicleDriverId
    );

    updatePaginatedObject("vehicleDrivers", vehicleDriverId, {
      payments: [...(vehicleDriver?.payments || []), ...payments],
    });
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
      <InlineSwitch
        shadowColor={"#f2f2f2"}
        items={switchItems}
        selectedColor={Colors.mrDBlue}
        value={switchSelection}
        onChange={setSwitchSelection}
      />

      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <VehicleSelector
          vehicles={vehiclesData}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        />

        {switchSelection === 'payments' && 
        <>
        <CustomButton onPress={() => setShowAddPayModal(true)} style={styles.addPaymentRow}>
          <Text style={styles.addText}>+ ADD A PAYMENT</Text>
        </CustomButton>

      <FlatList
        data={vehicleDriver?.payments}
        scrollEnabled={false}
        onEndReached={() => {
          if (paymentsPagination?.page < paymentsPagination?.max_page) {
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
      
      }

      {switchSelection === 'comments' &&<Comments setShowCommentModal={() => setShowCommentModal(true)} /> }

      </ScrollView>
    {showCommentModal && (
        <CommentModal setShowCommentModal={() => setShowCommentModal(false)} />
      )}
      {showAddPayModal && (
        <AddModal
          setShowAddPayModal={() => setShowAddPayModal(false)}
          vehicleDriverId={vehicleDriverId}
        />
      )}
      
    </SafeAreaView>
  );
};
