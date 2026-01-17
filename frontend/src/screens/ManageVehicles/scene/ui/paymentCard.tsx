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

  const getInitials = () => {
    const firstName = vehicleDriver?.driver?.first_name || "";
    const lastName = vehicleDriver?.driver?.last_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInHours < 1) {
        return "Just now";
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return date.toLocaleDateString("en-ZA", {
          month: "short",
          day: "numeric",
        });
      }
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.shimmer} />

      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getInitials()}</Text>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.headerName}>
                {vehicleDriver?.driver?.first_name} {vehicleDriver?.driver?.last_name}
              </Text>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={13} color={Colors.mediumGrey} />
                <Text style={styles.timeText}>{formatDate(payment.paid_at)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Paid</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.amountLabel}>Payment Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>R</Text>
              <Text style={styles.amountText}>
                {formatAmount(payment.price_fixed?.value || 0)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
