import { View } from "react-native";
import { Text } from "react-native-paper";

import { find, isEmpty } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LICENCES } from "@/src/screens/Drivers/Scene/utils/constants";
import { Colors } from "@/constants/ui";

import { styles } from "../styles/licences";

type LicencesProp = {
  licences: string[];
};

export const Licences = (props: LicencesProp) => {
  const { licences } = props;

  if (isEmpty(licences)) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Licenses & Certifications</Text>

      <View style={styles.row}>
        {licences?.map((licence, index: number) => {
          const item = find(LICENCES, { slug: licence });

          return (
            <View key={`${licence}-${index}`} style={styles.pillModern}>
              <MaterialCommunityIcons
                name="license"
                size={16}
                color={Colors.mrDBlue}
              />
              <Text style={styles.pillText}>{item?.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
