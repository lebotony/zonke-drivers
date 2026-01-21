import { VehicleProfile } from "@/src/screens/VehicleProfile";
import { withAuth } from "@/src/components/withAuth";

function Vehicles() {
  return <VehicleProfile />;
}

export default withAuth(Vehicles);
