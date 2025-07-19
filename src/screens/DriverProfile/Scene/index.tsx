import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@components/visual/avatar";
import profilePic from "@assets/images/profile_pic.png";
import { PLATFORM_FILTERS } from "@screens/Drivers/Scene/utils/constants";
import { Platforms } from "@screens/Drivers/Scene/ui/platforms";
import { HorizontalDivider } from "@components/shapes/divider";

import { styles } from "./styles";
import { Header } from "./ui/header";
import { Colors } from "@constants/ui";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { CustomButton } from "@components/elements/button";

export const Scene = () => {
  return (
    <>
      <SafeAreaView>
        {Platform.OS !== "web" && <Header />}

        <View style={styles.body}>
          <View style={styles.profilePic}>
            <Avatar source={profilePic} round width={125} />
            <Text style={styles.name}>
              Kudakwashe Munyazure <Text style={styles.age}>(56 yrs)</Text>
            </Text>

            <View style={styles.pill}>
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
              <Text style={styles.location}>
                Code A, 2022,
                <Text style={styles.licenseCountry}> South Africa</Text>
              </Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.location}>
                Code C, 2015,<Text style={styles.licenseCountry}> USA</Text>
              </Text>
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
                  size={26}
                  color={Colors.darkGreen}
                />
                <Text style={styles.statValue}>400</Text>
                <Text style={styles.statType}>Payments</Text>
              </View>

              <View style={styles.stat}>
                <MaterialCommunityIcons
                  name="steering"
                  size={26}
                  color={Colors.mrDBlue}
                />
                <Text style={styles.statValue}>4</Text>
                <Text style={styles.statType}>Experience</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <FontAwesome5 name="car-crash" size={26} color="red" />
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statType}>Accidents</Text>
              </View>

              <View style={styles.stat}>
                <FontAwesome name="comments" size={26} color="black" />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statType}>Comments</Text>
              </View>

              <View style={styles.stat}>
                <FontAwesome5 name="car-side" size={26} color="black" />
                <Text style={styles.statValue}>6</Text>
                <Text style={styles.statType}>Previous vehicles</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.actions}>
        <CustomButton
          color={Colors.mrDBlue}
          onPress={() => {}}
          customStyle={{
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            height: 80
          }}
        >
          <Entypo name="message" size={20} color={Colors.white} />
          <Text style={styles.buttonText}>Message</Text>
        </CustomButton>
      </View>
    </>
  );
};
