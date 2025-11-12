import { TextInput, View } from "react-native";
import { Text } from "react-native-paper";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Modal } from "@/src/components/elements/modal";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";

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

    addPayment(params).then((response) => {
      const vehicle = getUpdatedObjectSnapshot("vehicle", vehicleId);

      updatePaginatedObject("userVehicles", vehicleId, {
        ...vehicle,
        vehicle_drivers: [
          {
            ...vehicleDriver,
            last_payment: response.price_fixed.value,
            payment_count: vehicleDriver?.payment_count + 1,
            total_payments:
              Number(vehicleDriver.total_payments) +
              Number(response.price_fixed.value),
            payments: [response, ...(vehicleDriver?.payments || [])],
          },
        ],
      });

      setShowAddPayModal();
    });
  };

  return (
    <Modal fn={setShowAddPayModal}>
      <View style={styles.addModal}>
        <View style={styles.addInput}>
          <Text style={styles.amountText}>Amount</Text>
          <View style={styles.inputWrapper}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
              }}
            >
              R
            </Text>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    style={styles.textInput}
                    placeholder="..."
                    placeholderTextColor="#888"
                    value={value || ""}
                    onChangeText={onChange}
                    underlineColorAndroid="transparent"
                  />
                );
              }}
            />
          </View>
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          color={Colors.lightGreen}
          customStyle={{ paddingHorizontal: 14 }}
        >
          <Text style={[styles.amountText, { color: Colors.white }]}>ADD</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
