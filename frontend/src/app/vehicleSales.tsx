import { router } from "expo-router";
import { VehicleSalesScreen } from "@/src/screens/VehicleSales";

export default function VehicleSales() {
  const toggleSales = () => {
    // Navigate back to auth or home depending on auth state
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <VehicleSalesScreen
      toggleSales={toggleSales}
      targetVehicleId={null}
      onVehicleViewed={() => {}}
    />
  );
}
