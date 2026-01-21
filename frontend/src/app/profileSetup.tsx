import { ProfileSetUpScreen } from "../screens/ProfileSetUp";
import { withAuth } from "@/src/components/withAuth";

function ProfileSetUp() {
  return <ProfileSetUpScreen />;
}

export default withAuth(ProfileSetUp);
