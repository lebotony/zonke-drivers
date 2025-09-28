import { useLocalSearchParams } from "expo-router";

import { Scene } from "./Scene";

export const DriverProfile = () => {
  const { id } = useLocalSearchParams();

  return <Scene />;
};
