import { View } from "react-native";
import { Text } from "react-native-paper";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Modal } from "@/src/components/elements/modal";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";

import { createVehicleDriver } from "../../actions";
import { styles } from "../styles/vehicleDriverModal";
import { AppToast } from "@/src/components/CustomToast/customToast";

type AddVehicleDriverModalProps = {
  vehicleId: string;
  driverId: string;
  setShowVehicleDriverModal: (value: any) => void;
  setSelectedDriverId: (value: any) => void;
};

export const VehicleDriverModal = (props: AddVehicleDriverModalProps) => {
  const {
    driverId,
    vehicleId,
    setShowVehicleDriverModal,
    setSelectedDriverId,
  } = props;

  const { updatePaginatedObject } = usePaginatedCache();

  const handleAddVehicleDriver = () => {
    const params = {
      driver_id: driverId,
      vehicle_id: vehicleId,
    };

    createVehicleDriver(params)
      .then((res) => {
        AppToast("Vehicle Driver added successfully", true);

        updatePaginatedObject("userVehicles", vehicleId, {
          vehicle_drivers: [
            {
              ...res,
              last_payment: 0,
              payment_count: 0,
              total_payments: 0,
              payments: [],
            },
          ],
        });
      })
      .catch((err) => {
        AppToast();
        throw new Error("Error while creating vehicle_driver: ", err);
      });

    setShowVehicleDriverModal(false);
    setSelectedDriverId(null);
  };

  return (
    <Modal fn={() => setShowVehicleDriverModal(false)}>
      <Text style={styles.messageText}>
        Accepting this driver will remove the existing vehicle driver, if there
        is one. Are you sure you want to proceed?
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          onPress={() => setShowVehicleDriverModal(false)}
          color={Colors.lightGreen}
          customStyle={{
            paddingHorizontal: 14,
            backgroundColor: Colors.lighterGrey,
          }}
        >
          <Text
            style={{
              color: Colors.white,
            }}
          >
            Cancel
          </Text>
        </CustomButton>
        <CustomButton
          onPress={handleAddVehicleDriver}
          color={Colors.lightGreen}
          customStyle={{
            paddingHorizontal: 14,
            backgroundColor: Colors.mrDBlue,
          }}
        >
          <Text style={[styles.messageText, { color: Colors.white }]}>Add</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
