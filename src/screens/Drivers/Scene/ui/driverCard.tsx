import { View, Text } from "react-native";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { Avatar } from "@components/visual/avatar";
import { Colors } from "@constants/ui";
import { HorizontalDivider } from "@components/shapes/divider";
import profilePic from "@assets/images/profile_pic.png";
import { CustomButton } from "@components/elements/button";

import { styles } from "../styles/driverCard";
import { PLATFORM_FILTERS } from "../utils/constants";
import { Platforms } from "./platforms";

const ICON_SIZE = 14;

export const DriverCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar source={profilePic} round />
        <View style={styles.details}>
          <Text style={styles.name}>
            Romeo Makota
            <Text style={styles.age}> (54 yrs)</Text>
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            </View>
            <Text style={styles.ratingText}>
              4.9 <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <Feather name="clock" size={13} color={Colors.checkers60Green} />
            </View>

            <Text style={styles.address} numberOfLines={1}>
              4 years, 5 months
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
      <Platforms platforms={PLATFORM_FILTERS} />
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
