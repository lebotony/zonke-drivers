import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { isEmpty } from "lodash";

import { HorizontalDivider } from "@/src/components/shapes/divider";
import { Colors } from "@/constants/ui";
import { PopupMenu } from "@/src/components/popup";
import { CustomButton } from "@/src/components/elements/button";
import { shadowStyles } from "@/src/components/shadowStyles";
import { capitalizeFirstLetter } from "@/src/utils";

import { styles } from "../styles/card";
import { MANAGEMENT_OPTIONS } from "../constants";

type CardProps = {
  vehicle: Vehicle;
  setVehicleId: (value: string) => void;
  setShowVehicleDriverModal: (val: boolean) => void;
};

export const Card = (props: CardProps) => {
  const { vehicle, setVehicleId, setShowVehicleDriverModal } = props;

  const vehicleDriver = vehicle.vehicle_drivers?.[0];
  const noVehicleDrivers = isEmpty(vehicle?.vehicle_drivers);

  const handleSelectOptions = (value: string) => {
    if (value === "Add accident") {
      setShowVehicleDriverModal(true);
      setVehicleId(vehicle.id);
      return;
    }
  };

  return (
    <View style={styles.card}>
      <PopupMenu
        options={MANAGEMENT_OPTIONS.map((v) => v.label)}
        style={{ position: "absolute", top: 5, right: 0 }}
        onSelect={handleSelectOptions}
      >
        <MaterialIcons name="menu" size={24} color={Colors.black} />
      </PopupMenu>
      <TouchableOpacity
        onPress={() => router.push(`/(tabs)/vehicle/${vehicle?.id}`)}
        style={styles.body}
      >
        <Image
          source={vehicle?.asset?.url}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            {capitalizeFirstLetter(
              `${vehicle?.brand ?? ""} ${vehicle?.model ?? ""}`
            )}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailIcon}>
              <MaterialIcons name="payment" size={15} color="black" />
            </View>
            <Text
              style={styles.paymentCountText}
            >{`(${vehicleDriver?.payment_count ?? 0} payments)`}</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailIcon}>
              <MaterialIcons
                name="event-seat"
                size={18}
                color={Colors.mrDBlue}
              />
            </View>

            <Text style={styles.address} numberOfLines={1}>
              {vehicle?.passengers ? `${vehicle?.passengers} passengers` : "NA"}
            </Text>
          </View>

          {/* <View style={styles.ratingRow}>
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
          </View> */}
        </View>
      </TouchableOpacity>
      <HorizontalDivider color="#ededed" />
      <View style={styles.payments}>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>Recent Paid</Text>
          <Text style={styles.amountText}>
            R{vehicleDriver?.last_payment ?? 0}
          </Text>
        </View>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>Total Paid</Text>
          <Text style={styles.amountText}>
            R{vehicleDriver?.total_payments ?? 0}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {!noVehicleDrivers && (
          <CustomButton
            onPress={() => router.push(`/payments/${vehicle?.id}`)}
            customStyle={{
              paddingTop: 10,
              paddingBottom: 12,
              backgroundColor: Colors.lightGreen,
              width: "48%",
              marginVertical: 10,
              ...shadowStyles,
            }}
          >
            <Text
              style={[
                styles.name,
                { fontWeight: 500, lineHeight: 17, color: Colors.white },
              ]}
            >
              View Details
            </Text>
          </CustomButton>
        )}

        <View
          style={{
            position: "relative",
            width: noVehicleDrivers ? "100%" : "48%",
          }}
        >
          <CustomButton
            onPress={() => router.push(`/applicants/${vehicle.id}`)}
            customStyle={{
              paddingTop: 10,
              paddingBottom: 12,
              backgroundColor: Colors.mrDBlue,
              marginVertical: 10,
              ...shadowStyles,
            }}
          >
            <Text
              style={[
                styles.name,
                { fontWeight: 500, lineHeight: 17, color: Colors.white },
              ]}
            >
              View Applicants
            </Text>
          </CustomButton>
          {(vehicle?.unseen_applications_count ?? 0) > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {vehicle?.unseen_applications_count}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
