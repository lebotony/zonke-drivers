import { View } from "react-native";
import { Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

import { styles } from "../styles/paymentCard";

type PaymentCardProps = {
  payment: Payment;
  vehicleDriver: VehicleDriver;
};

export const PaymentCard = (props: PaymentCardProps) => {
  const { payment, vehicleDriver } = props;

  return (
    <View style={styles.card}>
      <View style={styles.leftBadge}></View>

      <View style={styles.header}>
        <Text style={styles.headerName}>
          {vehicleDriver.first_name} {vehicleDriver.last_name}
        </Text>
        <View style={styles.time}>
          <Ionicons name="time-outline" size={18} color={Colors.mediumGrey} />
          <Text style={styles.timeText}>{payment.paid_at}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={[styles.amountText, { color: Colors.dimGrey, fontSize: 18 }]}
        >
          Paid
        </Text>
        <Text style={styles.amountText}>
          + {`R${payment.price_fixed?.value}`}
        </Text>
      </View>
    </View>
  );
};
