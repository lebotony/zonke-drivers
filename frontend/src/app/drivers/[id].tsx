import { DriverProfile } from "@/src/screens/DriverProfile";
import { withAuth } from "@/src/components/withAuth";

function Drivers() {
  return <DriverProfile />;
}

export default withAuth(Drivers);
