import { InterestedBuyers } from "@/src/screens/InterestedBuyers";
import { withAuth } from "@/src/components/withAuth";

function InterestedBuyersPage() {
  return <InterestedBuyers />;
}

export default withAuth(InterestedBuyersPage);
