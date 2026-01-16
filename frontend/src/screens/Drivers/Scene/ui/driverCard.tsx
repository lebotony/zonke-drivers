import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { isEmpty } from "lodash";

import { Avatar } from "@/src/components/visual/avatar";
import { Colors } from "@/constants/ui";
import { HorizontalDivider } from "@/src/components/shapes/divider";
import { CustomButton } from "@/src/components/elements/button";
import { Spinner } from "@/src/components/elements/Spinner";

import { styles } from "../styles/driverCard";
import { Platforms } from "./platforms";
import { Details } from "./details";

type DriverProps = {
  driver: Driver;
  applicant?: boolean;
  setSelectedDriverId?: (val: string) => void;
  setShowVehicleDriverModal?: (val: boolean) => void;
  seen?: boolean;
};

export const DriverCard = (props: DriverProps) => {
  const {
    driver,
    applicant = false,
    setSelectedDriverId,
    setShowVehicleDriverModal,
  } = props;

  if (!driver) return <Spinner />;

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        {driver?.asset_url ? (
          <Avatar source={driver?.asset_url} radius shadow width={83} />
        ) : (
          <View style={styles.defaultPic}>
            <Ionicons name="person" size={60} color={Colors.mediumLightGrey} />
          </View>
        )}

        <TouchableOpacity onPress={() => router.push(`/drivers/${driver?.id}`)}>
          <Details driver={driver} />
        </TouchableOpacity>
      </View>

      {!isEmpty(driver?.platforms) && (
        <>
          <HorizontalDivider color="#ededed" />
          <Platforms platforms={driver?.platforms} />
        </>
      )}
      <HorizontalDivider color="#ededed" />

      <View
        style={
          applicant && {
            flexDirection: "row",
            justifyContent: "space-between",
          }
        }
      >
        <CustomButton
          color="white"
          onPress={() => router.push(`/drivers/${driver?.id}`)}
          customStyle={applicant ? styles.cardBtns : styles.viewProfileBtn}
        >
          <Text
            style={[
              styles.name,
              applicant && { color: Colors.white },
              { fontWeight: 500 },
            ]}
          >
            View profile
          </Text>
        </CustomButton>
        {applicant && (
          <CustomButton
            color="white"
            onPress={() => {
              setSelectedDriverId!(driver?.id);
              setShowVehicleDriverModal!(true);
            }}
            customStyle={[styles.cardBtns, { backgroundColor: Colors.mrDBlue }]}
          >
            <Text
              style={[styles.name, { fontWeight: 500, color: Colors.white }]}
            >
              Add driver
            </Text>
          </CustomButton>
        )}
      </View>
    </View>
  );
};
