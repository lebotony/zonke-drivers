import { ComponentProps } from "react";
import { Image } from "expo-image";

import { styles } from "./styles";

type AvatarProps = {
  round?: boolean;
  width?: number;
} & ComponentProps<typeof Image>;

export const Avatar = ({ round, width = 74, ...imageProps }: AvatarProps) => {
  return (
    <Image
      style={[{ width, height: width, aspectRatio: 1 }, round && styles.round]}
      {...imageProps}
    />
  );
};
