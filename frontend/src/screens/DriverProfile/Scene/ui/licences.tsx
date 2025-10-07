import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../styles/licences";

type LicencesProp = {
  licences: Licence[];
};

export const Licences = (props: LicencesProp) => {
  const { licences } = props;

  return (
    <View>
      <Text style={styles.heading}>Licences & Certificates</Text>

      <View style={styles.row}>
        {licences.map((licence: Licence) => (
          <View style={styles.pill}>
            <Text
              style={styles.location}
            >{`${licence.name}, ${licence.year}`}</Text>
            <Text style={styles.location}> South Africa</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
