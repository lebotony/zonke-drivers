import { View } from "react-native";
import { Text } from "react-native-paper";

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

import { HorizontalDivider } from "@/src/components/shapes/divider";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";
import { styles } from "../styles/card";
import { shadowStyles } from "@/src/components/shadowStyles";
import { capitalizeFirstLetter } from "@/src/utils";

const ICON_SIZE = 14;

type CardProps = {
  vehicle: Vehicle;
};

export const Card = (props: CardProps) => {
  const { vehicle } = props;

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Image
          source={vehicle?.asset?.url}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            {capitalizeFirstLetter(`${vehicle?.brand} ${vehicle?.model}`)}
          </Text>

          <View style={styles.rowInfo}>
            <View style={styles.detailIcon}>
              <AntDesign name="star" size={ICON_SIZE} color={Colors.yellow} />
            </View>
            <Text style={styles.ratingText}>
              {vehicle?.rating}{" "}
              <Text style={styles.ratingCreteria}>(200 payments)</Text>
            </Text>
          </View>

          <View style={styles.rowInfo}>
              <MaterialIcons
                name="event-seat"
                size={18}
                color={Colors.mrDBlue}
              />
            <Text style={styles.passText}>
              {`${vehicle?.passengers} passengers`}
            </Text>
          </View>

          {/* <View style={styles.rowInfo}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        <CustomButton
          onPress={() => router.push(`/applicants/${vehicle.id}`)}
          customStyle={{
            paddingTop: 10,
            paddingBottom: 12,
            backgroundColor: Colors.mrDBlue,
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
            View Applicants
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};
