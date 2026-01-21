import React from "react";
import { View, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onNavigateToAuth: () => void;
  action: string;
};

export const SimpleAuthModal = ({ visible, onDismiss, onNavigateToAuth, action }: Props) => {
  const handleSignIn = () => {
    onDismiss();
    onNavigateToAuth();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={48} color={Colors.mrDBlue} />
          </View>

          <Text style={styles.title}>Authentication Required</Text>
          <Text style={styles.message}>
            To {action}, you need to sign in or create an account.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onDismiss}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Continue Browsing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignIn}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryButtonText}>Sign In / Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(118, 203, 237, 0.1)",
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
  message: {
    fontSize: 15,
    color: Colors.mediumGrey,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.mrDBlue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.mrDBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: Colors.bg,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.mediumGrey,
    fontSize: 15,
    fontWeight: "600",
  },
});
