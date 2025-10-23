import { View } from "react-native";

import { Colors } from "../../../constants/ui";

export const BarLine = () => (
  <View
    style={{
      marginTop: 10,
      height: 5,
      width: 50,
      backgroundColor: Colors.grey,
      borderRadius: 50,
      alignSelf: "center",
    }}
  />
);
