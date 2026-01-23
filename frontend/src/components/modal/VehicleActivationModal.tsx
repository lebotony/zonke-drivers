import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { Modal } from "./index";

type MissingField = "model" | "image" | "price";

type VehicleActivationModalProps = {
  onDismiss: () => void;
  missingFields: MissingField[];
};

const FIELD_LABELS: Record<MissingField, string> = {
  model: "Vehicle model",
  image: "Vehicle image",
  price: "Rent per week",
};

export const VehicleActivationModal = ({
  onDismiss,
  missingFields,
}: VehicleActivationModalProps) => {
  return (
    <Modal onDismiss={onDismiss}>
      <View style={styles.container}>
        {/* Header Icon */}
        <View style={styles.iconContainer}>
          <MaterialIcons name="info-outline" size={56} color={Colors.lightRed} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Cannot Activate Vehicle</Text>

        {/* Description */}
        <Text style={styles.description}>
          Please complete the following required fields before activating your
          vehicle:
        </Text>

        {/* Missing Fields List */}
        <View style={styles.fieldsList}>
          {missingFields.map((field) => (
            <View key={field} style={styles.fieldItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.fieldText}>{FIELD_LABELS[field]}</Text>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onDismiss}
        >
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${Colors.lightRed}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: Colors.mediumGrey,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  fieldsList: {
    width: "100%",
    backgroundColor: Colors.bg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  fieldItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.lightRed,
    marginRight: 12,
  },
  fieldText: {
    fontSize: 16,
    color: Colors.darkCharcoalGrey,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    backgroundColor: Colors.mrDBlue,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: Colors.darkCharcoalGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
