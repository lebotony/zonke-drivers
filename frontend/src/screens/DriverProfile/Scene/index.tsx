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

import { Avatar } from "@/src/components/visual/avatar";
import profilePic from "@/assets/images/profile_pic.png";
import { PLATFORM_FILTERS } from "../../Drivers/Scene/utils/constants";
import { Platforms } from "../../Drivers/Scene/ui/platforms";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";

import { styles } from "./styles";
import { Header } from "./ui/header";

export const Scene = () => {
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
              Kudakwashe Munyazure <Text style={styles.age}>(56 yrs)</Text>
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
            I'm passionate about helping people look and feel their best.
          </Text>

          {/* <HorizontalDivider color="#ededed" /> */}

          <Text style={styles.heading}>Platforms</Text>

          <Platforms
            customContainerStyle={styles.platormsContainer}
            platforms={PLATFORM_FILTERS}
          />

          {/* <HorizontalDivider color="#ededed" /> */}

          <Text style={styles.heading}>Licences & Certificates</Text>
          <View style={styles.row}>
            <View style={styles.pill}>
              <Text style={styles.location}>Code A, 2022</Text>
              <Text style={styles.location}> South Africa</Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.location}>Code C, 2015</Text>
              <Text style={styles.location}> USA</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <AntDesign name="star" size={26} color={Colors.yellow} />
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statType}>Rating</Text>
              </View>

              <View style={styles.stat}>
                <FontAwesome5
                  name="money-bill-wave"
                  size={24}
                  color={Colors.darkGreen}
                />
                <Text style={styles.statValue}>400</Text>
                <Text style={styles.statType}>Payments</Text>
              </View>

              <View style={styles.stat}>
                <Feather
                  name="clock"
                  size={26}
                  color={Colors.checkers60Green}
                />
                <Text style={styles.statValue}>4</Text>
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
                <Text style={styles.statValue}>6</Text>
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
