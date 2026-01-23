import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isEmpty } from "lodash";

import { Colors } from "@/constants/ui";
import { Avatar } from "@/src/components/visual/avatar";
import { CustomButton } from "@/src/components/elements/button";
import { Fieldset } from "@/src/components/form/fieldset/input";
import { ImageLoadingOverlay } from "@/src/components/elements/ImageLoadingOverlay";
import { pickImage } from "@/src/helpers/pickImage";
import { useAuth } from "@/src/authContext";
import { OnboardingData } from "..";
import { stepStyles } from "../styles/stepStyles";

const schema = z.object({
  description: z.string().optional(),
  asset: z
    .object({
      file_path: z.string().optional(),
      filename: z.string().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof schema>;

type Step1Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
};

export const Step1ProfilePicture = (props: Step1Props) => {
  const { data, updateData, onNext } = props;
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { onLogout } = useAuth();

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: data.description || "",
      asset: data.asset || undefined,
    },
  });

  const pickedAsset = watch("asset");
  const isProfilePicPresent = !isEmpty(pickedAsset?.file_path);

  const handleSelectImage = () => {
    pickImage(setValue, [1, 1], null, null, null, setIsUploadingImage);
  };

  const handleNext = handleSubmit((formData) => {
    updateData(formData);
    onNext();
  });

  const handleLogout = () => {
    onLogout?.();
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
          <Text style={stepStyles.headerTitle}>Welcome to Zonke Drivers</Text>
          <Text style={stepStyles.headerSubtitle}>
            Let's set up your profile
          </Text>
          <View style={stepStyles.progressContainer}>
            <View style={stepStyles.progressBar}>
              <View style={[stepStyles.progressFill, { width: "20%" }]} />
            </View>
            <Text style={stepStyles.stepIndicator}>Step 1 of 5</Text>
          </View>
        </View>

        <View style={stepStyles.card}>
          <Text style={stepStyles.cardTitle}>Profile Picture & Bio</Text>
          <Text style={stepStyles.cardSubtitle}>
            Add a photo and describe yourself
          </Text>

          <TouchableOpacity
            onPress={isUploadingImage ? undefined : handleSelectImage}
            style={stepStyles.avatarTouchable}
            disabled={isUploadingImage}
            activeOpacity={0.8}
          >
            <View style={stepStyles.avatarContainer}>
              <View
                style={[
                  stepStyles.avatarWrapper,
                  isProfilePicPresent && stepStyles.avatarWrapperFilled,
                ]}
              >
                <Avatar
                  width={110}
                  source={isProfilePicPresent && pickedAsset?.file_path}
                  round
                  backgroundColor={false}
                />
                <ImageLoadingOverlay
                  isLoading={isUploadingImage}
                  borderRadius={55}
                />
              </View>

              <View style={stepStyles.editBadge}>
                <MaterialIcons
                  name="photo-camera"
                  size={18}
                  color={Colors.white}
                />
              </View>
            </View>

            <Text style={stepStyles.avatarLabel}>
              {isProfilePicPresent ? "Change Photo" : "Add Photo"}
            </Text>
          </TouchableOpacity>

          <Fieldset
            label="Bio"
            name="description"
            inputIconSize={23}
            control={control}
            placeholder="Tell clients about your experience, specialties and what you offer..."
            type="text"
            numberOfLines={4}
            optional
            errors={errors}
          />
        </View>

        <CustomButton
          onPress={handleNext}
          haptics="light"
          customStyle={stepStyles.nextButton}
        >
          <Text style={stepStyles.buttonText}>Continue</Text>
        </CustomButton>

        <CustomButton
          onPress={handleLogout}
          haptics="light"
          customStyle={stepStyles.backButton}
        >
          <Text style={stepStyles.backButtonText}>Log Out</Text>
        </CustomButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
