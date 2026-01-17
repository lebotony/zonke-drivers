import { IS_IOS } from "@/constants/srcConstants";

export const topOffset = {
  paddingTop: IS_IOS ? 56 : 35,
};
export const topOffsetHeight = IS_IOS ? 56 : 30;
