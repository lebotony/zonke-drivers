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

import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { Fieldset } from "@/src/components/form/fieldset/input";
import { ModalDatePicker } from "@/src/components/elements/datePicker";
import { OnboardingData } from "..";
import { stepStyles } from "../styles/stepStyles";

const schema = z.object({
  dob: z.string().min(1, "Date of birth is required"),
});

type FormValues = z.infer<typeof schema>;

type Step2Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Step2DateOfBirth = (props: Step2Props) => {
  const { data, updateData, onNext, onBack } = props;

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dob: data.dob || "",
    },
  });

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
          <Text style={stepStyles.headerTitle}>Personal Details</Text>
          <Text style={stepStyles.headerSubtitle}>
            Tell us your date of birth
          </Text>
          <View style={stepStyles.progressContainer}>
            <View style={stepStyles.progressBar}>
              <View style={[stepStyles.progressFill, { width: "40%" }]} />
            </View>
            <Text style={stepStyles.stepIndicator}>Step 2 of 5</Text>
          </View>
        </View>

        <View style={stepStyles.card}>
          <Text style={stepStyles.cardTitle}>Date of Birth</Text>
          <Text style={stepStyles.cardSubtitle}>
            We need this to verify your eligibility
          </Text>

          <Fieldset
            label="Date of Birth"
            name="dob"
            inputIcon="event"
            control={control}
            placeholder="2001-10-20"
            errors={errors}
            required
            editable={false}
          />

          <ModalDatePicker setValue={setValue} />
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
