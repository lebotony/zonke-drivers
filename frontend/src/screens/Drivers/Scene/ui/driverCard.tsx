import { View } from "react-native";
import { Text } from "react-native-paper";

import { router } from "expo-router";

import { isEmpty } from "lodash";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { HorizontalDivider } from "@/src/components/shapes/divider";
import { CustomButton } from "@/src/components/elements/button";
import { calculateAge } from "@/src/helpers/calculateAge";

import { styles } from "../styles/driverCard";
import { Platforms } from "./platforms";
import { Spinner } from "@/src/components/elements/Spinner";

const ICON_SIZE = 14;

type DriverProps = {
  driver: Driver;
};

export const DriverCard = (props: DriverProps) => {
  const { driver } = props;

  if (!driver) return <Spinner />;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {driver?.asset_url ? (
          <Avatar source={driver?.asset_url} radius shadow width={83} />
        ) : (
          <View style={styles.defaultPic}>
            <Ionicons name="person" size={60} color={Colors.mediumLightGrey} />
          </View>
        )}
        <View style={styles.details}>
          <Text style={styles.name}>
            {driver?.first_name} {driver?.last_name}
            <Text style={styles.age}> {`(${calculateAge(driver?.dob)})`}</Text>
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            </View>
            <Text style={styles.ratingText}>
              {driver?.rating}{" "}
              <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <Feather name="clock" size={13} color={Colors.checkers60Green} />
            </View>

            <Text style={styles.address} numberOfLines={1}>
              {driver?.experience || "NA"} years of Experience
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <MaterialIcons
                name="location-pin"
                size={17}
                color={Colors.mediumDarkGrey}
              />
            </View>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
              {driver?.location?.address || "NA"}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.save}>
        <MaterialCommunityIcons name="cards-heart" size={24} color="red" />
      </View> */}

      {!isEmpty(driver?.platforms) && (
        <>
          <HorizontalDivider color="#ededed" />
          <Platforms platforms={driver?.platforms} />
        </>
      )}
      <HorizontalDivider color="#ededed" />

      <CustomButton
        color="white"
        onPress={() => router.push(`/drivers/${driver?.id}`)}
        customStyle={{ paddingVertical: 1 }}
      >
        <Text style={[styles.name, { fontWeight: 500, lineHeight: 17 }]}>
          View profile
        </Text>
      </CustomButton>
    </View>
  );
};
