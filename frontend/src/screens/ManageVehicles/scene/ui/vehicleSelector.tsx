import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PopupMenu } from "@/src/components/popup";
import { styles } from "../styles/applicants";
import { Text } from "react-native-paper";
import { capitalizeFirstLetter } from "@/src/utils";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSelect = (model: string) => {
    const vehicle = vehicles?.find((v) => v.model === model);
    if (vehicle) onSelectVehicle(vehicle);
    setOptionsVisible(false);
  };

  return (
    <PopupMenu
      style={styles.vehicleSelector}
      options={vehicles?.map((vehicle) => vehicle.model)}
      innerBtnFn={() => setOptionsVisible(!optionsVisible)}
      selectedValue={selectedVehicle ? selectedVehicle.model : "Select Vehicle"}
      onSelect={handleSelect}
    >
      <View style={styles.vehicleSelectorLeft}>
        {selectedVehicle && (
          <Image
            source={selectedVehicle?.asset?.url}
            style={styles.vehicleSelectorImage}
          />
        )}
        <View style={styles.vehicleSelectorInfo}>
          <Text style={styles.vehicleSelectorLabel}>Selected Vehicle</Text>
          <Text style={styles.vehicleSelectorModel}>
            {selectedVehicle
              ? capitalizeFirstLetter(
                  `${selectedVehicle.brand} ${selectedVehicle.model}`
                )
              : "Select a vehicle"}
          </Text>
        </View>
      </View>

      <Ionicons
        name={optionsVisible ? "chevron-up" : "chevron-down"}
        size={20}
        color="#666"
      />
    </PopupMenu>
  );
};
