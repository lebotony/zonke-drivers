import { StatusBar } from "react-native";
import { IS_IOS } from "@/constants/srcConstants";

const androidTopOffset = (StatusBar.currentHeight ?? 24) + 12;

export const topOffset = {
  paddingTop: IS_IOS ? 56 : androidTopOffset,
};
export const topOffsetHeight = IS_IOS ? 56 : androidTopOffset;
