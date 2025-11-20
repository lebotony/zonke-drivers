import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { find } from "lodash";

import { useCustomQuery } from "@/src/useQueryContext";
import { Comments } from "@/src/screens/ViewSection/scene/ui/comments";
import { CommentModal } from "@/src/screens/ViewSection/scene/ui/commentModal";
import { InlineSwitch } from "@/src/components/misc/inlineSwitch";
import { Colors } from "@/constants/ui";

import { VehicleSelector } from "./vehicleSelector";
import { Payments } from "./payments";
import { styles } from "../styles/payments";
import { switchItems } from "../constants";

export const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const initialVehicleId = Array.isArray(id) ? id[0] : id;

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAddPayModal, setShowAddPayModal] = useState(false);
  const [switchSelection, setSwitchSelection] = useState(switchItems[0].slug);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { getCachedData } = useCustomQuery();
  const { userVehicles } = getCachedData(["userVehicles"]);

  useEffect(() => {
    if (!selectedVehicle && userVehicles?.length) {
      const initial =
        find(userVehicles, { id: initialVehicleId }) || userVehicles[0];
      setSelectedVehicle(initial);
    }
  }, [userVehicles, selectedVehicle, initialVehicleId]);

  const vehicleDriver: VehicleDriver = find(userVehicles, {
    id: selectedVehicle?.id,
  })?.vehicle_drivers?.[0];

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
          backgroundColor: Colors.bg,
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
        <Payments
          selectedVehicle={selectedVehicle}
          vehicleDriver={vehicleDriver}
          showAddPayModal={showAddPayModal}
          setShowAddPayModal={setShowAddPayModal}
        />
      )}

      {switchSelection === "comments" && (
        <Comments
          driverId={vehicleDriver.driver.id}
          vehicleId={selectedVehicle!.id}
          setShowCommentModal={() => setShowCommentModal(true)}
        />
      )}

      {showCommentModal && vehicleDriver?.driver?.id && selectedVehicle && (
        <CommentModal
          driverId={vehicleDriver.driver.id}
          vehicleId={selectedVehicle?.id}
          setShowCommentModal={() => setShowCommentModal(false)}
        />
      )}
    </SafeAreaView>
  );
};
