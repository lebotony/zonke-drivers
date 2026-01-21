import { ChatScreen } from "@/src/screens/Messages/Chat";
import { withAuth } from "@/src/components/withAuth";

const Chat = () => {
  return <ChatScreen />;
};

export default withAuth(Chat);
