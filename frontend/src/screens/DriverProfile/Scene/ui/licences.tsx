import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../styles/licences";
import { LICENCES } from "@/src/screens/Drivers/Scene/utils/constants";
import { find } from "lodash";

type LicencesProp = {
  licences: string[];
};

export const Licences = (props: LicencesProp) => {
  const { licences } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Licences & Certificates</Text>

      <View style={styles.row}>
        {licences?.map((licence, index: number) => {
          const item = find(LICENCES, { slug: licence });

          return (
            <View key={`${licence}-${index}`} style={styles.pill}>
              <Text style={styles.location}>{item?.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
