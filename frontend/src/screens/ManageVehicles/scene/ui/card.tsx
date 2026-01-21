import { TouchableOpacity, View, Animated, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useRef } from "react";

import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { isEmpty } from "lodash";
import { useQueryClient } from "@tanstack/react-query";

import { Colors } from "@/constants/ui";
import { PopupMenu } from "@/src/components/popup";
import { CustomButton } from "@/src/components/elements/button";
import { capitalizeFirstLetter } from "@/src/utils";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { formatDateShort } from "@/src/helpers/calculateAge";

import { styles } from "../styles/card";
import { MANAGEMENT_OPTIONS } from "../constants";
import { activateVehicle, deleteVehicle } from "../../actions";

type CardProps = {
  vehicle: Vehicle;
  setVehicleId: (value: string) => void;
  setShowVehicleDriverModal: (val: boolean) => void;
};

export const Card = (props: CardProps) => {
  const { vehicle, setVehicleId, setShowVehicleDriverModal } = props;

  const queryClient = useQueryClient();
  const { updatePaginatedObject, removeItemFromPaginatedList } =
    usePaginatedCache();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const vehicleDriver = vehicle.vehicle_drivers?.[0];
  const noVehicleDrivers = isEmpty(vehicle?.vehicle_drivers);

  const isActive = vehicle?.active;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleSetActive = () =>
    activateVehicle({
      active: !vehicle?.active,
      vehicle_id: vehicle?.id,
    })
      .then((res) => {
        AppToast(
          `Successfully ${vehicle?.active ? "de-activated" : "activated"} vehicle`,
          true,
        );

        updatePaginatedObject("userVehicles", vehicle?.id, {
          active: !vehicle?.active,
        });
      })
      .catch((err) => {
        const errorKey = err.response?.data?.error;

        if (errorKey === "missing_fields") {
          return AppToast(
            `'Model', 'Vehicle image' or 'Rent' fields are empty`,
          );
        } else {
          AppToast();
          throw new Error("Set vehicle active error:", err);
        }
      });

  const handleDelete = () =>
    deleteVehicle(vehicle?.id)
      .then((res) => {
        AppToast(`Successfully deleted vehicle`, true);

        removeItemFromPaginatedList("userVehicles", vehicle?.id);
      })
      .catch((err) => {
        AppToast();
        throw new Error("Delete vehicle error:", err);
      });

  const handleSelectOptions = (value: string) => {
    if (value === "Add accident" && vehicleDriver) {
      setShowVehicleDriverModal(true);
      setVehicleId(vehicle.id);
      return;
    }

    if (value === "Search driver")
      return router.push(`/vehicleDriverSearch/${vehicle?.id}`);

    if (value === "Edit Vehicle")
      return router.push(`/(tabs)/vehicle/${vehicle?.id}`);

    if (value === "Activate / Deactivate") return handleSetActive();

    if (value === "Delete Vehicle") return handleDelete();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.optionsBtnWrapper}>
          <PopupMenu
            options={MANAGEMENT_OPTIONS.map((v) => v.label)}
            onSelect={handleSelectOptions}
          >
            <View style={styles.optionsBtn}>
              <MaterialIcons
                name="more-vert"
                size={20}
                color={Colors.darkCharcoalGrey}
              />
            </View>
          </PopupMenu>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/vehicle/${vehicle?.id}`)}
          style={styles.body}
          activeOpacity={0.7}
        >
          {isEmpty(vehicle?.asset?.url) ? (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="commute" size={70} color={Colors.white} />
            </View>
          ) : (
            <Image
              source={vehicle?.asset?.url}
              style={styles.image}
              contentFit="cover"
            />
          )}

          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {capitalizeFirstLetter(
                `${vehicle?.brand ?? ""} ${vehicle?.model ?? ""}`,
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

            {vehicle?.passengers && (
              <View style={styles.detailsRow}>
                <View style={styles.detailIcon}>
                  <MaterialIcons
                    name="event-seat"
                    size={18}
                    color={Colors.mrDBlue}
                  />
                </View>

                <Text style={styles.detailText} numberOfLines={1}>
                  {`${vehicle?.passengers} passengers`}
                </Text>
              </View>
            )}

            <View style={styles.detailsRow}>
              <View style={styles.detailIcon}>
                <Feather name="play-circle" size={15} color="black" />
              </View>

              <Text
                style={[
                  styles.detailText,
                  {
                    color: isActive ? Colors.emeraldGreen : Colors.lightRed,
                    fontWeight: 600,
                  },
                ]}
              >
                {isActive ? "active" : "inactive"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.payments}>
          <View style={styles.paymentCard}>
            <Text style={styles.paymentText}>Recent Payment</Text>
            {!isEmpty(vehicleDriver?.last_payment?.date) && (
              <Text style={styles.dateText}>
                {formatDateShort(vehicleDriver?.last_payment?.date)}
              </Text>
            )}
            <Text style={styles.amountText}>
              R{vehicleDriver?.last_payment?.amount ?? 0}
            </Text>
          </View>
          <View style={styles.paymentCard}>
            <Text style={styles.paymentText}>Total Paid</Text>
            <Text style={styles.amountText}>
              R{vehicleDriver?.total_payments ?? 0}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {!noVehicleDrivers && (
            <>
              <CustomButton
                onPress={() => router.push(`/details/${vehicle?.id}`)}
                customStyle={styles.viewDetailsBtn}
              >
                <Text style={styles.btnText}>View Details</Text>
              </CustomButton>

              {vehicle?.on_sale && (
                <CustomButton
                  onPress={() =>
                    router.push(`/interestedBuyers/${vehicle.id}` as any)
                  }
                  customStyle={styles.interestedBuyersBtn}
                >
                  <Text style={styles.interestedBuyersBtnText}>
                    Interested Buyers
                  </Text>
                </CustomButton>
              )}
            </>
          )}

          {noVehicleDrivers && (
            <View style={styles.applicantBtnWrapper}>
              <CustomButton
                onPress={() => router.push(`/applicants/${vehicle.id}`)}
                customStyle={styles.btnStyles}
              >
                <Text style={styles.btnText}>View Applicants</Text>
              </CustomButton>
              {(vehicle?.unseen_applications_count ?? 0) > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>
                    {(vehicle?.unseen_applications_count ?? 0) > 99
                      ? "99+"
                      : vehicle?.unseen_applications_count}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};
