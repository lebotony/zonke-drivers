import { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { AppToast } from "@/src/components/CustomToast/customToast";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Modal } from "@/src/components/elements/modal";

import { addPayment } from "../../actions";
import { AmountSchema } from "../../schema";
import { styles } from "../styles/addModal";

type AmountFormValues = z.infer<typeof AmountSchema>;

type AddModalProps = {
  vehicleId: string;
  vehicleDriver: VehicleDriver;

  setShowAddPayModal: VoidCallback;
};

export const AddModal = (props: AddModalProps) => {
  const { vehicleDriver, vehicleId, setShowAddPayModal } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { control, handleSubmit } = useForm<AmountFormValues>({
    resolver: zodResolver(AmountSchema),
  });

  const { updatePaginatedObject, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const onSubmit = (data: AmountFormValues) => {
    const params = {
      vehicle_driver_id: vehicleDriver?.id,
      price_fixed: {
        value: data.amount,
        currency: "ZAR",
      },
    };

    addPayment(params)
      .then((response) => {
        AppToast("Payment added successfully", true);

        const vehicle = getUpdatedObjectSnapshot("vehicle", vehicleId);

        updatePaginatedObject("userVehicles", vehicleId, {
          ...vehicle,
          vehicle_drivers: [
            {
              ...vehicleDriver,
              last_payment: {
                amount: response.price_fixed.value,
                date: new Date().toISOString(),
              },
              payment_count: vehicleDriver?.payment_count + 1,
              total_payments:
                Number(vehicleDriver.total_payments) +
                Number(response.price_fixed.value),
              payments: [response, ...(vehicleDriver?.payments || [])],
            },
          ],
        });

        setShowAddPayModal();
      })
      .catch((err) => {
        AppToast();
        throw new Error("Error while adding payment: ", err);
      });
  };

  return (
    <Modal fn={setShowAddPayModal}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Payment</Text>
          <Text style={styles.subtitle}>
            Record a payment for {vehicleDriver?.driver?.first_name} {vehicleDriver?.driver?.last_name}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Payment Amount</Text>
          <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
            <View style={styles.currencyContainer}>
              <Text style={styles.currencyText}>R</Text>
            </View>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    style={styles.textInput}
                    placeholder="0.00"
                    placeholderTextColor="#B0B0B0"
                    value={value || ""}
                    onChangeText={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlineColorAndroid="transparent"
                    keyboardType="decimal-pad"
                  />
                );
              }}
            />
          </View>
          <Text style={styles.helperText}>
            Enter the amount paid by the driver in South African Rand
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CONFIRM PAYMENT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={setShowAddPayModal}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
