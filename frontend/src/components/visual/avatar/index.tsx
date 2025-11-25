import { ComponentProps } from "react";
import { Image } from "expo-image";

import { styles } from "./styles";
import { shadowStyles } from "../../shadowStyles";
import { Colors } from "@/constants/ui";

type AvatarProps = {
  round?: boolean;
  width?: number;
  shadow?: boolean;
  radius?: boolean;
  backgroundColor?: boolean;
} & ComponentProps<typeof Image>;

export const Avatar = ({
  shadow,
  round,
  radius,
  width = 74,
  backgroundColor = true,
  ...imageProps
}: AvatarProps) => {
  return (
    <Image
      style={[
        { width, height: width, aspectRatio: 1 },
        shadow && { ...shadowStyles },
        round && styles.round,
        radius && { borderRadius: 10 },
        backgroundColor && { backgroundColor: Colors.verylightBlue },
      ]}
      {...imageProps}
    />
  );
};
