import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { find } from "lodash";

import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { LICENCES } from "@/src/screens/Drivers/Scene/utils/constants";
import { SelectLicenceArea } from "@/src/screens/ProfileSetUp/scene/ui/selectAreasModern";
import { OnboardingData } from "..";
import { stepStyles } from "../styles/stepStyles";

const schema = z.object({
  licences: z.string().array().optional(),
});

type FormValues = z.infer<typeof schema>;

type Step4Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Step4Licences = (props: Step4Props) => {
  const { data, updateData, onNext, onBack } = props;

  const {
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      licences: data.licences || [],
    },
  });

  const selectedLicences = watch("licences");

  const handleAddLicence = (item: string) => {
    const licence = (find(LICENCES, { name: item }) as Licence)?.slug;

    if (licence && !selectedLicences?.includes(licence)) {
      setValue("licences", [...(selectedLicences || []), licence]);
    }
  };

  const handleRemoveLicences = (item: string) => {
    setValue(
      "licences",
      selectedLicences?.filter((licence) => licence !== item),
    );
  };

  const handleNext = handleSubmit((formData) => {
    updateData(formData);
    onNext();
  });

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
          <Text style={stepStyles.headerTitle}>Your Licences</Text>
          <Text style={stepStyles.headerSubtitle}>
            Add your driver licences
          </Text>
          <View style={stepStyles.progressContainer}>
            <View style={stepStyles.progressBar}>
              <View style={[stepStyles.progressFill, { width: "80%" }]} />
            </View>
            <Text style={stepStyles.stepIndicator}>Step 4 of 5</Text>
          </View>
        </View>

        <View style={stepStyles.card}>
          <Text style={stepStyles.cardTitle}>Driver Licences</Text>
          <Text style={stepStyles.cardSubtitle}>
            Select all licences you hold
          </Text>

          <SelectLicenceArea
            onAddItem={(value: string) => handleAddLicence(value)}
            onRemoveItem={handleRemoveLicences}
            options={LICENCES.map((licence) => licence.name)}
            selectedItems={selectedLicences}
            label="Licences"
          />
        </View>

        <View style={stepStyles.buttonRow}>
          <CustomButton
            onPress={onBack}
            haptics="light"
            customStyle={[stepStyles.backButton, stepStyles.buttonHalf]}
          >
            <Text style={stepStyles.backButtonText}>Back</Text>
          </CustomButton>
          <CustomButton
            onPress={handleNext}
            haptics="light"
            customStyle={[stepStyles.nextButton, stepStyles.buttonHalf]}
          >
            <Text style={stepStyles.buttonText}>Continue</Text>
          </CustomButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
