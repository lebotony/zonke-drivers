import { View, Text } from "react-native";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { HorizontalDivider } from "@/src/components/shapes/divider";
import profilePic from "@/assets/images/profile_pic.png";
import { CustomButton } from "@/src/components/elements/button";

import { styles } from "../styles/driverCard";
import { Platforms } from "./platforms";

const ICON_SIZE = 14;

type DriverProps = {
  driver: Driver;
};

export const DriverCard = (props: DriverProps) => {
  const { driver } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar source={profilePic} radius shadow width={83} />
        <View style={styles.details}>
          <Text style={styles.name}>
            {driver.first_name} {driver.last_name}
            <Text style={styles.age}> {`(${driver.age})`}</Text>
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            </View>
            <Text style={styles.ratingText}>
              {driver.rating}{" "}
              <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <Feather name="clock" size={13} color={Colors.checkers60Green} />
            </View>

            <Text style={styles.address} numberOfLines={1}>
              {driver.experience} years
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
            <Text style={styles.address} numberOfLines={1}>
              Soweto, Gauteng, South Africa
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.save}>
        <MaterialCommunityIcons name="cards-heart" size={24} color="red" />
      </View>

      <HorizontalDivider color="#ededed" />
      <Platforms platforms={driver.platforms} />
      <HorizontalDivider color="#ededed" />

      <CustomButton
        onPress={() => router.push("/drivers/1")}
        customStyle={{ paddingVertical: 1 }}
      >
        <Text style={[styles.name, { fontWeight: 500, lineHeight: 17 }]}>
          View profile
        </Text>
      </CustomButton>
    </View>
  );
};
