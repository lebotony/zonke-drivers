import { OwnerProfile } from "@/src/screens/OwnerProfile";
import { withAuth } from "@/src/components/withAuth";

function Owners() {
  return <OwnerProfile />;
}

export default withAuth(Owners);
