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
import { DropdownInput } from "@/src/components/dropdown";
import { OnboardingData } from "..";
import { stepStyles } from "../styles/stepStyles";

const schema = z.object({
  experience: z.string().min(1, "Experience is required"),
  location: z
    .object({
      lon: z.number().optional(),
      lat: z.number().optional(),
      country: z.string().optional(),
      city: z.string().optional(),
      place: z.string().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof schema>;

type Step3Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Step3ExperienceLocation = (props: Step3Props) => {
  const { data, updateData, onNext, onBack } = props;

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      experience: data.experience || "",
      location: data.location || {},
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
          <Text style={stepStyles.headerTitle}>Experience & Location</Text>
          <Text style={stepStyles.headerSubtitle}>
            Share your driving background
          </Text>
          <View style={stepStyles.progressContainer}>
            <View style={stepStyles.progressBar}>
              <View style={[stepStyles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={stepStyles.stepIndicator}>Step 3 of 5</Text>
          </View>
        </View>

        <View style={stepStyles.card}>
          <Text style={stepStyles.cardTitle}>Your Experience</Text>
          <Text style={stepStyles.cardSubtitle}>
            Help clients understand your background
          </Text>

          <Fieldset
            label="Years of Experience"
            name="experience"
            inputIcon="access-time"
            control={control}
            placeholder="12"
            errors={errors}
            required
            decimalPad
          />

          <DropdownInput
            name="location"
            required
            label="Location"
            value={data.location?.place}
            setValue={setValue}
            placeholder="Search location..."
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
