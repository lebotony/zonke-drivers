import { ComponentProps } from "react";
import { Image } from "expo-image";

import { styles } from "./styles";
import { shadowStyles } from "../../shadowStyles";

type AvatarProps = {
  round?: boolean;
  width?: number;
  shadow?: boolean;
} & ComponentProps<typeof Image>;

export const Avatar = ({
  shadow,
  round,
  width = 74,
  ...imageProps
}: AvatarProps) => {
  return (
    <Image
      style={[
        { width, height: width, aspectRatio: 1 },
        shadow && { ...shadowStyles },
        round && styles.round,
      ]}
      {...imageProps}
    />
  );
};
