import { useEffect } from "react";
import { router } from "expo-router";
import { ManageVehicles } from "@/src/screens/ManageVehicles";
import { useAuth } from "@/src/authContext";

export default function Manage() {
  const { pendingVehicleId } = useAuth();

  useEffect(() => {
    if (pendingVehicleId) {
      router.push("/vehicleSales");
    }
  }, [pendingVehicleId]);

  return <ManageVehicles />;
}
