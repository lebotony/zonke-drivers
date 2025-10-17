import { View } from "react-native";
import { DriversScreen } from "../Drivers";
import { VehiclesScreen } from "../Vehicles";

export const HomeScreen = () => {
  const driver = true;

  return driver ? <VehiclesScreen /> : <DriversScreen />;
};
