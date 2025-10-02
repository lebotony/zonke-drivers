import { View, Text } from "react-native";

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

import { HorizontalDivider } from "@/src/components/shapes/divider";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { styles } from "../styles/card";
import { shadowStyles } from "@/src/components/shadowStyles";

const ICON_SIZE = 14;

type CardProps = {
  vehicleDriver: VehicleDriver;
};

export const Card = (props: CardProps) => {
  const { vehicleDriver } = props;

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Image source={vehicleDriver.asset_url} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}> {vehicleDriver.vehicle.name} </Text>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            </View>
            <Text style={styles.ratingText}>
              {vehicleDriver.rating}{" "}
              <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.detailIcon}>
              <Feather name="clock" size={13} color={Colors.checkers60Green} />
            </View>

            <Text style={styles.address} numberOfLines={1}>
              1 years, 5 months
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
      <HorizontalDivider color="#ededed" />
      <View style={styles.payments}>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>Recent Payed</Text>
          <Text style={styles.amountText}>$45</Text>
        </View>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>Total Payed</Text>
          <Text style={styles.amountText}>$1050</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <CustomButton
          onPress={() => router.push(`/payments/${vehicleDriver.id}`)}
          customStyle={{
            paddingTop: 10,
            paddingBottom: 12,
            backgroundColor: Colors.lightGreen,
            width: 200,
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
      </View>
    </View>
  );
};
