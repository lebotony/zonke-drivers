import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileSetup } from "./scene/ui/profileSetupModern";
import { styles } from "./styles";

export const ProfileSetUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSetup />
    </SafeAreaView>
  );
};
