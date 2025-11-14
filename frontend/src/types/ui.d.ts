import { Colors } from "../../constants/ui";

global {
  type ColorsType = keyof typeof Colors;
  type VoidCallback = () => void;
}
