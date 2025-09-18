import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileSetup } from "./scene/ui/profileSetup";
import { styles } from "./styles";

export const ProfileSetUpScreen = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileSetup setStep={(val: number) => setStep(val)} />
    </SafeAreaView>
  );
};
