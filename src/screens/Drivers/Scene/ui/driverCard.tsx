import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Avatar } from "@components/visual/avatar";
import { Colors } from "@/constants/ui";
import { HorizontalDivider } from "@components/shapes/divider";
import profilePic from "@assets/images/profile_pic.png";
import { CustomButton } from "@components/elements/button";

import { styles } from "../styles/driverCard";
import { PLATFORM_FILTERS } from "./quickFilters";

const ICON_SIZE = 16;

export const DriverCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar source={profilePic} round />
        <View style={styles.details}>
          <Text style={styles.name}>
            Romeo Makota
            <Text style={styles.age}> (106 yrs)</Text>
          </Text>

          <View style={styles.ratingRow}>
            <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            <Text style={styles.ratingText}>
              4.9 <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <MaterialCommunityIcons
              name="steering"
              size={ICON_SIZE}
              color={Colors.mrDBlue}
            />

            <Text style={styles.address} numberOfLines={1}>
              4 years, 5 months
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <MaterialIcons
              name="location-pin"
              size={ICON_SIZE}
              color="purple"
            />
            <Text style={styles.address} numberOfLines={1}>
              Soweto, Gauteng, South Africa
            </Text>
          </View>
        </View>

        <View style={styles.save}>
          <SimpleLineIcons name="heart" size={24} color={Colors.lightGrey} />
        </View>
      </View>

      <HorizontalDivider color="#ededed" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="end"
        contentContainerStyle={styles.platformTags}
      >
        {["bike", "uber_eats", "checkers"].map((platform) => {
          const def = PLATFORM_FILTERS.find(({ value }) => value === platform);

          if (def) {
            return (
              <View style={[styles.platform, { backgroundColor: def.bgColor }]}>
                {def.icon && def.icon}
                {def.slug && (
                  <Text style={[{ color: def.color }]}>{def.slug}</Text>
                )}
              </View>
            );
          }

          return null;
        })}
      </ScrollView>

      <HorizontalDivider color="#ededed" />

      <CustomButton
        onPress={() => router.push("/drivers/1")}
        customStyle={{ paddingVertical: 3 }}
      >
        <Text style={[styles.name, { fontWeight: 500 }]}>View profile</Text>
      </CustomButton>
    </View>
  );
};
