import { View } from "react-native";
import { Text } from "react-native-paper";

import { DEFAULT_ICON_SIZE } from "@expo/vector-icons/build/createIconSet";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { calculateAge } from "@/src/helpers/calculateAge";
import { Colors } from "@/constants/ui";

import { styles } from "../styles/details";

type DetailsProps = {
  driver: Driver;
};

export const Details = (props: DetailsProps) => {
  const { driver } = props;

  const isLocationAndExpNil = !driver?.experience && !driver?.location?.place;

  return (
    <View
      style={[
        styles.details,
        isLocationAndExpNil && { justifyContent: "flex-start" },
      ]}
    >
      <Text style={styles.name}>
        {driver?.first_name} {driver?.last_name}
        <Text style={styles.age}> {`(${calculateAge(driver?.dob)})`}</Text>
      </Text>
      {driver?.rating && (
        <View style={styles.ratingRow}>
          <View style={styles.detailIcon}>
            <AntDesign
              name="star"
              size={DEFAULT_ICON_SIZE}
              color={Colors.yellow}
            />
          </View>
          <Text style={styles.ratingText}>{driver?.rating} rating</Text>
        </View>
      )}

      {driver?.experience && (
        <View style={styles.ratingRow}>
          <View style={styles.detailIcon}>
            <Feather name="clock" size={13} color={Colors.checkers60Green} />
          </View>

          <Text style={styles.address} numberOfLines={1}>
            {driver?.experience || "NA"} years of Experience
          </Text>
        </View>
      )}

      {driver?.location?.place && (
        <View style={styles.ratingRow}>
          <View style={styles.detailIcon}>
            <MaterialIcons
              name="location-pin"
              size={17}
              color={Colors.mediumDarkGrey}
            />
          </View>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {driver?.location?.place || "NA"}
          </Text>
        </View>
      )}
    </View>
  );
};
