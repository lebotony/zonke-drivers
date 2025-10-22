import { Spinner } from "@/src/components/elements/Spinner";
import { DriversScreen } from "../Drivers";
import { VehiclesScreen } from "../Vehicles";
import { useCustomQuery } from "@/src/useQueryContext";

export const HomeScreen = () => {
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);

  if (!user) {
    return <Spinner />;
  }

  return user.role === "owner" ? <DriversScreen /> : <VehiclesScreen />;
};
