import { ApplicantsScreen } from "@/src/screens/ManageVehicles/scene/ui/applicants";
import { withAuth } from "@/src/components/withAuth";

function Applicant() {
  return <ApplicantsScreen />;
}

export default withAuth(Applicant);
