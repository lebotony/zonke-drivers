import { View } from "react-native";
import { Text } from "react-native-paper";

import { find, isEmpty } from "lodash";

import { LICENCES } from "@/src/screens/Drivers/Scene/utils/constants";

import { styles } from "../styles/licences";

type LicencesProp = {
  licences: string[];
};

export const Licences = (props: LicencesProp) => {
  const { licences } = props;

  return (
    <View style={[styles.container, isEmpty(licences) && { display: "none" }]}>
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
