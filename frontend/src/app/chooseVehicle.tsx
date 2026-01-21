import { ChooseVehicleScreen } from "@/src/screens/ChooseVehicle";
import { withAuth } from "@/src/components/withAuth";

function ChooseVehicle() {
  return <ChooseVehicleScreen />;
}

export default withAuth(ChooseVehicle);
