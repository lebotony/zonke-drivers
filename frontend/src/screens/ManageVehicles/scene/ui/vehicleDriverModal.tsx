import { View } from "react-native";
import { Text } from "react-native-paper";

import { router } from "expo-router";

import { find } from "lodash";

import { usePaginatedCache } from "@/src/updateCacheProvider";
import { Modal } from "@/src/components/elements/modal";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { useCustomQuery } from "@/src/useQueryContext";

import { createVehicleDriver, updateVehicleDriver } from "../../actions";
import { styles } from "../styles/vehicleDriverModal";

type AddVehicleDriverModalProps = {
  vehicleId?: string;
  driverId?: string;
  accident?: boolean;
  setShowVehicleDriverModal: (value: any) => void;
  setSelectedDriverId?: (value: any) => void;
};

export const VehicleDriverModal = (props: AddVehicleDriverModalProps) => {
  const {
    driverId,
    vehicleId,
    accident,
    setShowVehicleDriverModal,
    setSelectedDriverId,
  } = props;

  const { getCachedData } = useCustomQuery();

  const { updatePaginatedObject, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const { userVehicles } = getCachedData(["userVehicles"]);

  const vehicleDriver: VehicleDriver = find(userVehicles, {
    id: vehicleId,
  })?.vehicle_drivers?.[0];

  const handleAddVehicleDriver = () => {
    const params = {
      driver_id: driverId,
      vehicle_id: vehicleId,
    };

    const vehicle = getUpdatedObjectSnapshot(
      "userVehicles",
      vehicleId as string,
    );

    createVehicleDriver(params)
      .then((res) => {
        AppToast("Vehicle Driver added successfully", true);

        updatePaginatedObject("userVehicles", vehicleId as string, {
          applications: vehicle?.applications?.filter(
            (application: VehicleApplication) =>
              application?.driver?.id !== driverId,
          ),
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

        router.push("/(tabs)/manage");
      })
      .catch((err) => {
        AppToast();
        throw new Error("Error while creating vehicle_driver: ", err);
      });

    setShowVehicleDriverModal(false);
    setSelectedDriverId!(null);
  };

  const handleAddAccident = () => {
    updateVehicleDriver(vehicleDriver?.id)
      .then((res) => {
        AppToast("Driver accident added", true);

        updatePaginatedObject("userVehicles", vehicleId as string, {
          vehicle_drivers: [
            {
              ...vehicleDriver,
              accidents: (vehicleDriver?.accidents ?? 0) + 1,
            },
          ],
        });
      })
      .catch((err) => {
        AppToast();
        throw new Error("Error while adding driver accident: ", err);
      });

    setShowVehicleDriverModal(false);
  };

  return (
    <Modal fn={() => setShowVehicleDriverModal(false)}>
      {!accident ? (
        <Text style={styles.messageText}>
          Accepting this driver will remove the existing vehicle driver, if
          there is one. Are you sure you want to proceed?
        </Text>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text>Are you sure you want to add an accident for: </Text>
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            {vehicleDriver?.driver?.first_name}{" "}
            {vehicleDriver?.driver?.last_name}
          </Text>
        </View>
      )}
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
          onPress={accident ? handleAddAccident : handleAddVehicleDriver}
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
