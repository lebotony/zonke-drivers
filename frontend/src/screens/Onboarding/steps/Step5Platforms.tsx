import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { Spinner } from "@/src/components/elements/Spinner";
import {
  PLATFORM_FILTERS,
  PLATFORM_LABELS,
} from "@/src/screens/Drivers/Scene/utils/constants";
import { SelectPlatformArea } from "@/src/screens/ProfileSetUp/scene/ui/selectAreasModern";
import { updateDriver, updateUserAsset } from "@/src/screens/ProfileSetUp/actions";
import { httpPut } from "@/src/requests";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { useCustomQuery } from "@/src/useQueryContext";
import { useAuth } from "@/src/authContext";
import { OnboardingData } from "..";
import { stepStyles } from "../styles/stepStyles";

const schema = z.object({
  platforms: z.string().array().optional(),
});

type FormValues = z.infer<typeof schema>;

type Step5Props = {
  data: OnboardingData;
  onboardingData: OnboardingData;
  onBack: () => void;
};

export const Step5Platforms = (props: Step5Props) => {
  const { data, onboardingData, onBack } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTargetVehicleModal, setShowTargetVehicleModal] = useState(false);

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);
  const { pendingVehicleId, setPendingVehicleId } = useAuth();

  const {
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      platforms: data.platforms || [],
    },
  });

  const selectedPlatforms = watch("platforms");

  const handleAddPlatform = (item: string) => {
    const selectedValue = PLATFORM_FILTERS.filter((p) => p.value === item)[0]
      ?.value;

    if (selectedValue && !selectedPlatforms?.includes(selectedValue)) {
      setValue("platforms", [...(selectedPlatforms || []), selectedValue]);
    }
  };

  const handleRemovePlatform = (item: string) => {
    setValue(
      "platforms",
      selectedPlatforms?.filter((platform) => platform !== item),
    );
  };

  const handleComplete = handleSubmit((formData) => {
    setIsSubmitting(true);

    const finalData = { ...onboardingData, ...formData };

    const uploadAssetPromise = finalData.asset?.file_path
      ? updateUserAsset(finalData.asset, user?.id)
      : Promise.resolve(null);

    uploadAssetPromise
      .then((assetResponse) => {
        if (assetResponse) {
          queryClient.setQueryData(["user"], {
            ...user,
            asset: assetResponse,
          });
        }

        const driverData = {
          description: finalData.description,
          dob: finalData.dob,
          experience: finalData.experience,
          location: finalData.location,
          licences: finalData.licences,
          platforms: finalData.platforms,
        };

        return updateDriver(driverData);
      })
      .then((driverResponse) => {
        const { user: updatedUser, ...otherParams } = driverResponse;
        queryClient.setQueryData(["user"], updatedUser);
        queryClient.setQueryData(["driverProfile"], otherParams);

        return httpPut("/users", user?.id, { onboarding_complete: true });
      })
      .then((updatedUser) => {
        queryClient.setQueryData(["user"], updatedUser);
        AppToast("Profile setup complete!", true);

        if (pendingVehicleId) {
          setShowTargetVehicleModal(true);
        } else {
          router.replace("/(tabs)");
        }
      })
      .catch((err) => {
        console.error("Onboarding error:", err);
        AppToast("Failed to complete onboarding");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  });

  const handleGoToVehicle = () => {
    setShowTargetVehicleModal(false);
    router.push("/(tabs)/purchase");
  };

  const handleGoToHome = () => {
    setShowTargetVehicleModal(false);
    setPendingVehicleId?.(null);
    router.push("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={stepStyles.scrollContent}
      >
        <View style={stepStyles.heroSection}>
          <Text style={stepStyles.headerTitle}>Almost Done!</Text>
          <Text style={stepStyles.headerSubtitle}>
            Choose your platforms
          </Text>
          <View style={stepStyles.progressContainer}>
            <View style={stepStyles.progressBar}>
              <View style={[stepStyles.progressFill, { width: "100%" }]} />
            </View>
            <Text style={stepStyles.stepIndicator}>Step 5 of 5</Text>
          </View>
        </View>

        <View style={stepStyles.card}>
          <Text style={stepStyles.cardTitle}>Platforms & Services</Text>
          <Text style={stepStyles.cardSubtitle}>
            Select platforms you've worked on
          </Text>

          <SelectPlatformArea
            onAddItem={(value: string) => handleAddPlatform(value)}
            onRemoveItem={handleRemovePlatform}
            options={PLATFORM_LABELS}
            selectedItems={selectedPlatforms}
            label="Platforms"
          />
        </View>

        <View style={stepStyles.buttonRow}>
          <CustomButton
            onPress={isSubmitting ? undefined : onBack}
            haptics="light"
            customStyle={[stepStyles.backButton, stepStyles.buttonHalf]}
            disabled={isSubmitting}
          >
            <Text style={stepStyles.backButtonText}>Back</Text>
          </CustomButton>
          <CustomButton
            onPress={isSubmitting ? undefined : handleComplete}
            haptics="light"
            customStyle={[stepStyles.nextButton, stepStyles.buttonHalf]}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner color={Colors.white} />
            ) : (
              <Text style={stepStyles.buttonText}>Complete</Text>
            )}
          </CustomButton>
        </View>
      </ScrollView>

      <Modal
        visible={showTargetVehicleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTargetVehicleModal(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Welcome aboard!</Text>
            <Text style={modalStyles.modalMessage}>
              You showed interest in a vehicle earlier. Would you like to view
              it now or explore the app?
            </Text>

            <CustomButton
              onPress={handleGoToVehicle}
              haptics="light"
              customStyle={modalStyles.primaryButton}
            >
              <Text style={modalStyles.primaryButtonText}>View Vehicle</Text>
            </CustomButton>

            <CustomButton
              onPress={handleGoToHome}
              haptics="light"
              customStyle={modalStyles.secondaryButton}
            >
              <Text style={modalStyles.secondaryButtonText}>Go to Home</Text>
            </CustomButton>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const modalStyles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    marginBottom: 12,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: Colors.mediumGrey,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: Colors.mrDBlue,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkCharcoalGrey,
    textAlign: "center",
  },
};
