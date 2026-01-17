import { View } from "react-native";
import { Text } from "react-native-paper";

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
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {driver?.first_name} {driver?.last_name}{" "}
          <Text style={styles.age}>({calculateAge(driver?.dob)})</Text>
        </Text>
      </View>

      {driver?.rating && (
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <AntDesign name="star" size={13} color={Colors.yellow} />
            <Text style={styles.ratingText}>{driver?.rating}</Text>
          </View>
          <Text style={styles.ratingLabel}>rating</Text>
        </View>
      )}

      {driver?.experience && (
        <View style={styles.detailRow}>
          <View style={styles.iconWrapper}>
            <Feather name="clock" size={14} color={Colors.mrDBlue} />
          </View>
          <Text style={styles.detailText} numberOfLines={1}>
            {driver?.experience} {driver?.experience === 1 ? "year" : "years"}{" "}
            experience
          </Text>
        </View>
      )}

      {driver?.location?.place && (
        <View style={styles.detailRow}>
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name="location-pin"
              size={16}
              color={Colors.lightRed}
            />
          </View>
          <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
            {driver?.location?.place}
          </Text>
        </View>
      )}
    </View>
  );
};
