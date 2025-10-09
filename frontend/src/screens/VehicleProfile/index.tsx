import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Scene } from "./Scene";

export const VehicleProfile = () => {
  const { id } = useLocalSearchParams();

  return <Scene />;
};

export default VehicleProfile;
