import { OnboardingScreen } from "../screens/Onboarding";
import { withAuth } from "@/src/components/withAuth";

function Onboarding() {
  return <OnboardingScreen />;
}

export default withAuth(Onboarding);
