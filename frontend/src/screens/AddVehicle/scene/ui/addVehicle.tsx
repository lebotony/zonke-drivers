import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { find, isEmpty, isEqual } from "lodash";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { pickImage } from "@/src/helpers/pickImage";
import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { usePaginatedCache } from "@/src/updateCacheProvider";
import { useCustomQuery } from "@/src/useQueryContext";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { activateVehicle } from "@/src/screens/ManageVehicles/actions";

import { styles } from "../styles/addVehicle";
import { CardFormDef } from "../utils/cardFormDef";
import { Card } from "./card";
import { FormSchema } from "../../schema";
import { AddVehicleForm } from "./form";
import {
  createVehicle,
  updateVehicle,
  updateVehicleAsset,
} from "../../actions";

export type AddVehicleFormValues = z.infer<typeof FormSchema>;

export const AddVehicle = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const { updatePaginatedObject, addItemToPaginatedList } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { userVehicles } = getCachedData(["userVehicles"]);

  const isNewVehicle = vehicleId === "new" || vehicleId == undefined;
  const vehicle = !isNewVehicle
    ? find(userVehicles, { id: vehicleId })
    : undefined;

  const formValues = {
    model: vehicle?.model || "",
    mileage: (vehicle?.mileage && String(vehicle?.mileage)) || "",
    payments_per_month:
      (vehicle?.payments_per_month && String(vehicle?.payments_per_month)) ||
      "",
    type: vehicle?.type || "",
    brand: vehicle?.brand || "",
    manual: vehicle?.manual ?? false,
    fuel_type: vehicle?.fuel_type || "",
    engine_capacity:
      (vehicle?.engine_capacity && String(vehicle?.engine_capacity)) || "",
    passengers: (vehicle?.passengers && String(vehicle?.passengers)) || "",
    asset: vehicle?.asset
      ? {
          file_path: vehicle.asset.file_path || undefined,
          filename: vehicle.asset.filename || undefined,
        }
      : undefined,
    price_fixed: vehicle?.price_fixed?.value || "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddVehicleFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (vehicle) {
      reset(formValues);
    }
  }, [vehicle]);

  const { asset: initialAsset, ...initialValues } = formValues;
  const { asset: currentAsset, ...currentValues } = watch();
  const isSameForm = isEqual(currentValues, initialValues);

  const pickedAsset = watch("asset");
  const pickedType = watch("type");

  const isNewVehiclePic = !isEmpty(pickedAsset?.file_path);
  const isVehiclePic = !isEmpty(pickedAsset?.filename);
  const vehicleImage = isNewVehiclePic
    ? { uri: pickedAsset?.file_path }
    : vehicle?.asset?.url;

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const upsertVehicle = (params: AddVehicleFormValues) => {
    if (vehicle) {
      return updateVehicle(vehicleId, params)
        .then((res) => {
          AppToast("Vehicle updated successfully", true);

          updatePaginatedObject("userVehicles", vehicleId, {
            ...res,
            vehicle_drivers: vehicle?.vehicle_drivers,
          });

          router.push("/(tabs)/manage");
        })
        .catch((err) => {
          AppToast();
          throw new Error("Error while creating vehicle: ", err);
        });
    } else {
      return createVehicle(params)
        .then((res) => {
          AppToast("Vehicle created successfully", true);
          addItemToPaginatedList("userVehicles", res);
          router.push("/(tabs)/manage");
          reset(formValues);
        })
        .catch((err) => {
          if (
            err?.response?.statusText === "Failed to upload image" ||
            err?.response?.data?.error === "Failed to upload image"
          ) {
            AppToast("Failed to upload image");
            throw new Error("Failed to upload image: ", err);
          } else {
            AppToast();
            throw new Error("Error while creating vehicle: ", err);
          }
        });
    }
  };

  const create = (data: AddVehicleFormValues) => {
    const params = {
      ...data,
      price_fixed: data.price_fixed
        ? { value: Number(data.price_fixed), currency: "Rand" }
        : undefined,
    };

    upsertVehicle(params);
  };

  const updatePaginatedAsset = (res: Asset | Vehicle) => {
    isNewVehicle
      ? addItemToPaginatedList("userVehicles", res)
      : updatePaginatedObject("userVehicles", vehicleId, {
          asset: res,
        });

    isNewVehicle
      ? router.push(`/(tabs)/vehicle/${res.id}`)
      : router.push("/(tabs)/manage");
  };

  const handleSelectImage = () =>
    pickImage(
      setValue,
      undefined,
      updateVehicleAsset,
      vehicleId,
      updatePaginatedAsset
    );

  const handleSetActive = () =>
    activateVehicle({
      active: !vehicle?.active,
      vehicle_id: vehicleId,
    })
      .then((res) => {
        AppToast(
          `Successfully ${vehicle?.active ? "de-activated" : "activated"} vehicle`,
          true
        );

        updatePaginatedObject("userVehicles", vehicleId, {
          active: !vehicle?.active,
        });
      })
      .catch((err) => {
        const errorKey = err.response?.data?.error;

        if (errorKey === "missing_fields") {
          return AppToast(
            `'Model', 'Vehicle image' or 'Rent' fields are empty`
          );
        } else {
          AppToast();
          throw new Error("Set vehicle active error:", err);
        }
      });

  const driver = !isNewVehicle && vehicle?.vehicle_drivers[0]?.driver;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            Platform.OS === "android" && {
              paddingBottom: keyboardVisible ? keyboardHeight : 0,
            }
          }
        >
          <View style={styles.headerWrapper}>
            <Text style={[styles.header]}>Car Details</Text>

            <TouchableOpacity
              onPress={handleSelectImage}
              style={styles.imageWrapper}
            >
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={handleSelectImage}
              >
                <AntDesign name="plus" size={24} color={Colors.white} />
              </TouchableOpacity>
              <Image
                source={vehicleImage}
                style={[
                  styles.imageStyles,
                  !isVehiclePic && styles.defaultImageStyles,
                ]}
                contentFit="contain"
              />
            </TouchableOpacity>
            {!isVehiclePic && (
              <Text style={styles.imageText}>Add Vehicle image</Text>
            )}
          </View>

          {!isNewVehicle && (
            <View style={styles.driverContainer}>
              <Text style={styles.addVehicleSubText}>
                Current user of your vehicle
              </Text>
              <View style={styles.card}>
                <View style={styles.profileWrapper}>
                  {driver ? (
                    <Image
                      source={driver?.asset_url}
                      style={styles.driverImage}
                    />
                  ) : (
                    <MaterialIcons
                      name="person-outline"
                      size={30}
                      color={Colors.grey}
                    />
                  )}

                  <View style={styles.profileInfo}>
                    <Text
                      style={[
                        styles.profileName,
                        !driver && { color: Colors.grey },
                      ]}
                    >
                      {driver
                        ? driver?.first_name + " " + driver?.last_name
                        : "No driver assigned"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.addNewBtn}
                  onPress={() =>
                    router.push(`/vehicleDriverSearch/${vehicle?.id}`)
                  }
                >
                  <Text style={styles.addNewText}>Add new</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.addVehicleSubText}>
            {`${vehicle ? "Edit" : "Add"} your vehicle details below`}
          </Text>

          {CardFormDef.map((card, index) => (
            <Card
              key={`${card.label}-${index}`}
              card={card}
              setValue={setValue}
              watch={watch}
            />
          ))}

          <AddVehicleForm control={control} errors={errors} />

          <View>
            {vehicle && (
              <>
                <Text style={styles.nbActivate}>
                  NB: Vehicle wont be searchable if not activated
                </Text>
                <CustomButton
                  haptics="light"
                  onPress={handleSetActive}
                  customStyle={[
                    {
                      backgroundColor: vehicle?.active
                        ? Colors.lightRed
                        : Colors.lightGreen,
                    },
                    styles.btnStyles,
                  ]}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {vehicle?.active ? "De-activate" : "Activate"}
                  </Text>
                </CustomButton>
              </>
            )}

            <CustomButton
              haptics="light"
              onPress={isSameForm ? undefined : handleSubmit(create)}
              customStyle={[
                {
                  backgroundColor:
                    isSameForm && vehicle ? Colors.lightGrey : Colors.mrDBlue,
                },
                styles.btnStyles,
              ]}
            >
              <Text
                style={{ color: Colors.white, fontWeight: 700, fontSize: 16 }}
              >
                {`${vehicle ? "Edit" : "Add"} ${pickedType === "bike" ? "Bike" : "Vehicle"}`}
              </Text>
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
