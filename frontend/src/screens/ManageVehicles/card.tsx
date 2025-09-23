import { View, Text } from "react-native";
import { Avatar } from "../../components/visual/avatar";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import profilePic from "@assets/images/profile_pic.png";
import carPic from "@assets/images/car.jpg";
import { HorizontalDivider } from "../../components/shapes/divider";
import { Image } from "expo-image";
import { styles } from "./styles/card";
import { Colors } from "../../../constants/ui";
import { CustomButton } from "../../components/elements/button";
import { router } from "expo-router";

const ICON_SIZE = 14;

export const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar round width={40} source={profilePic} />
        <Text style={styles.headerName}>Lebohang Mdlongwa</Text>
        <View style={styles.dateWrapper}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={22}
            color={Colors.darkGrey}
          />
          <Text style={styles.time}>13:20</Text>
        </View>
      </View>
      <HorizontalDivider color="#ededed" />
      <View style={styles.body}>
        <Image source={carPic} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>Austin Martin</Text>

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
        <View style={styles.payments}>
          <View>
            <Text style={styles.paymentText}>Recent Payed</Text>
            <Text style={styles.amountText}>$45</Text>
          </View>
          <View>
            <Text style={styles.paymentText}>Total Payed</Text>
            <Text style={styles.amountText}>$1050</Text>
          </View>
        </View>
      </View>
      <HorizontalDivider color="#ededed" />
      <CustomButton
        onPress={() => router.push("/drivers/1")}
        customStyle={{ paddingTop: 8, paddingBottom: 12 }}
      >
        <Text style={[styles.name, { fontWeight: 500, lineHeight: 17 }]}>
          View Details
        </Text>
      </CustomButton>
    </View>
  );
};
