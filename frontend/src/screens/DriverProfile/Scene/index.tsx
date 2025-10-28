import { Platform, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { find, isEmpty } from "lodash";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { useCustomQuery } from "@/src/useQueryContext";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { shadowStyles } from "@/src/components/shadowStyles";
import { calculateAge } from "@/src/helpers/calculateAge";

import { Platforms } from "../../Drivers/Scene/ui/platforms";
import { styles } from "./styles";
import { Header } from "./ui/header";
import { Licences } from "./ui/licences";
import { createThread } from "../actions";
import { detailsDef } from "./ui/detailsPill";

export const Scene = () => {
  const { id } = useLocalSearchParams();
  const driverId = Array.isArray(id) ? id[0] : id;

  const { addItemToPaginatedList } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { drivers, threads = [] } = getCachedData(["drivers", "threads"]);
  const driver = find(drivers, { id: driverId });

  const handleCreateThread = () =>
    createThread({ participant_id: driver.user_id }).then((response) => {
      if (!find(threads, { id: response.id })) {
        addItemToPaginatedList("threads", response);
      }

      router.push(`/chats/${response.id}`);
    });

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
            <Avatar source={driver?.asset_url} round width={125} />
            <Text style={styles.name}>
              {driver?.first_name} {driver?.last_name}{" "}
              <Text
                style={styles.age}
              >{`(${calculateAge(driver?.dob)}) yrs`}</Text>
            </Text>

            <View style={styles.headerLocation}>
              <MaterialIcons
                name="location-pin"
                size={20}
                color={Colors.mediumDarkGrey}
              />
              <Text style={styles.location}>
                {!isEmpty(driver?.location)
                  ? driver?.location?.address.join(", ")
                  : ""}
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {driver?.description}
          </Text>

          <Text style={styles.heading}>Platforms</Text>

          <Platforms
            customContainerStyle={styles.platormsContainer}
            platforms={driver?.platforms}
          />

          <Licences licences={driver?.licences} />

          <View style={styles.stats}>
            <Text style={styles.driverDetailsText}>Driver Details</Text>
            <View style={styles.statsWrapper}>
              {detailsDef.map((detail, index) => (
                <View key={`${detail.slug}-${index}`} style={styles.stat}>
                  {detail.icon}
                  <Text style={styles.statValue}>
                    {driver?.[`${detail.slug}`]}
                  </Text>
                  <Text style={styles.statType}>{detail.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          color={Colors.emeraldGreen}
          onPress={handleCreateThread}
          customStyle={{
            flex: 1,
            borderRadius: 13,
            ...shadowStyles,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              marginRight: 5,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Message
          </Text>
          <Ionicons name="chatbubble-outline" size={20} color={Colors.white} />
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};
