import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

import { Step1ProfilePicture } from "./steps/Step1ProfilePicture";
import { Step2DateOfBirth } from "./steps/Step2DateOfBirth";
import { Step3ExperienceLocation } from "./steps/Step3ExperienceLocation";
import { Step4Licences } from "./steps/Step4Licences";
import { Step5Platforms } from "./steps/Step5Platforms";
import { styles } from "./styles";

export type OnboardingData = {
  asset?: { file_path?: string; filename?: string };
  description?: string;
  dob?: string;
  experience?: string;
  location?: LocationType;
  licences?: string[];
  platforms?: string[];
};

type OnboardingScreenProps = {};

export const OnboardingScreen = (props: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentStep === 1 && (
          <Step1ProfilePicture
            data={onboardingData}
            updateData={updateData}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Step2DateOfBirth
            data={onboardingData}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Step3ExperienceLocation
            data={onboardingData}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Step4Licences
            data={onboardingData}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Step5Platforms
            data={onboardingData}
            onboardingData={onboardingData}
            onBack={prevStep}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
