import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Modal } from "@/src/components/modal";
import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { capitalizeFirstLetter } from "@/src/utils";

import { styles } from "../styles/modal";

type Props = {
  visible: boolean;
  vehicle: Vehicle;
  driverName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
};

export const ConfirmationModal = ({
  visible,
  vehicle,
  driverName,
  onConfirm,
  onCancel,
  isSubmitting,
}: Props) => {
  if (!visible) return null;

  const hasCurrentDriver = vehicle?.vehicle_drivers && vehicle.vehicle_drivers.length > 0;

  return (
    <Modal onDismiss={onCancel}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="information-circle" size={48} color={Colors.mrDBlue} />
          </View>
        </View>

        <Text style={styles.title}>Confirm Driver Assignment</Text>

        <View style={styles.vehicleInfo}>
          <MaterialCommunityIcons name="car-side" size={24} color={Colors.mrDBlue} />
          <Text style={styles.vehicleName}>
            {capitalizeFirstLetter(vehicle?.brand)} {capitalizeFirstLetter(vehicle?.model)} {vehicle?.model_year}
          </Text>
        </View>

        <View style={styles.messageCard}>
          <View style={styles.messageRow}>
            <Ionicons name="person-add" size={20} color={Colors.emeraldGreen} />
            <Text style={styles.messageText}>
              <Text style={styles.boldText}>{driverName || "This driver"}</Text> will be assigned to this vehicle
            </Text>
          </View>

          {hasCurrentDriver && (
            <View style={[styles.messageRow, { marginTop: 12 }]}>
              <Ionicons name="warning" size={20} color={Colors.lightYellow} />
              <Text style={styles.warningText}>
                The current driver will be replaced with the new assignment
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={onCancel}
            color="white"
            customStyle={styles.cancelButton}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </CustomButton>

          <CustomButton
            onPress={onConfirm}
            color="emeraldGreen"
            customStyle={styles.confirmButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                <Text style={styles.confirmText}>Confirm</Text>
              </>
            )}
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
};
