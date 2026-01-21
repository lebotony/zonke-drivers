import { CreatePostScreen } from "../screens/Posts";
import { withAuth } from "@/src/components/withAuth";

function CreatePost() {
  return <CreatePostScreen />;
}

export default withAuth(CreatePost);
