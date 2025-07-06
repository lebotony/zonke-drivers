import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Scene } from "./Scene";

export const DriverProfile = () => {
  const { id } = useLocalSearchParams();

  return <Scene />;
};
