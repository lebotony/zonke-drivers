import { useEffect, useState } from "react";
import { VehicleSalesScreen } from "@/src/screens/VehicleSales";
import { useAuth } from "@/src/authContext";

export default function Purchase() {
  const { pendingVehicleId, setPendingVehicleId } = useAuth();
  const [targetVehicleId, setTargetVehicleId] = useState<string | null>(null);

  useEffect(() => {
    if (pendingVehicleId) {
      setTargetVehicleId(pendingVehicleId);
      setPendingVehicleId?.(null);
    }
  }, [pendingVehicleId]);

  const handleVehicleViewed = () => {
    setTargetVehicleId(null);
  };

  return (
    <VehicleSalesScreen
      toggleSales={() => {}}
      targetVehicleId={targetVehicleId}
      onVehicleViewed={handleVehicleViewed}
    />
  );
}
