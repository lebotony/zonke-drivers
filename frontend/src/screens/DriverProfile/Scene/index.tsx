import { Platform, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { find } from "lodash";

import { Avatar } from "@/src/components/visual/avatar";
import profilePic from "@/assets/images/profile_pic.png";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { useCustomQuery } from "@/src/useQueryContext";

import { Platforms } from "../../Drivers/Scene/ui/platforms";
import { styles } from "./styles";
import { Header } from "./ui/header";
import { Licences } from "./ui/licences";

export const Scene = () => {
  const { id } = useLocalSearchParams();
  const driverId = Array.isArray(id) ? id[0] : id;

  const { getCachedData } = useCustomQuery();
  const { drivers } = getCachedData(["drivers"]);
  const driver = find(drivers, { id: driverId });

  console.log("UUUUUUUUUUUU", driver);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ position: "relative" }}
      >
        <View style={styles.body}>
          {Platform.OS !== "web" && <Header customStyles={{ top: -10 }} />}
          <View style={styles.profilePic}>
            <Avatar source={profilePic} round width={125} />
            <Text style={styles.name}>
              {driver?.first_name} {driver?.last_name}{" "}
              <Text style={styles.age}>(56 yrs)</Text>
            </Text>

            <View style={styles.headerLocation}>
              <MaterialIcons
                name="location-pin"
                size={17}
                color={Colors.mediumDarkGrey}
              />
              <Text style={styles.location}>Soweto, Gauteng, South Africa</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {driver?.description}
          </Text>

          {/* <HorizontalDivider color="#ededed" /> */}

          <Text style={styles.heading}>Platforms</Text>

          <Platforms
            customContainerStyle={styles.platormsContainer}
            platforms={driver?.platforms}
          />

          <Licences licences={driver?.licences} />

          <View style={styles.stats}>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <AntDesign name="star" size={26} color={Colors.yellow} />
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statType}>Rating</Text>
              </View>

              <View style={styles.stat}>
                <Feather
                  name="clock"
                  size={26}
                  color={Colors.checkers60Green}
                />
                <Text style={styles.statValue}>{driver?.experience}</Text>
                <Text style={styles.statType}>Experience</Text>
              </View>

              <View style={styles.stat}>
                <FontAwesome5 name="car-crash" size={26} color="red" />
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statType}>Accidents</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <FontAwesome name="comments" size={26} color="black" />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statType}>Comments</Text>
              </View>

              <View style={styles.stat}>
                {/* <FontAwesome5 name="car-side" size={26} color="black" /> */}
                <FontAwesome5 name="car" size={26} color="black" />
                <Text style={styles.statValue}>
                  {driver?.previous_vehicles}
                </Text>
                <Text style={styles.statType}>Previous vehicles</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          color={Colors.emeraldGreen}
          onPress={() => {}}
          customStyle={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 13,
          }}
        >
          <Text style={{ color: Colors.white }}>Hire Now</Text>
        </CustomButton>
        <CustomButton
          color={Colors.white}
          onPress={() => {}}
          customStyle={{
            borderRadius: 13,
            paddingHorizontal: 13,
            borderColor: Colors.emeraldGreen,
            borderWidth: 1,
          }}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={Colors.emeraldGreen}
          />
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};
