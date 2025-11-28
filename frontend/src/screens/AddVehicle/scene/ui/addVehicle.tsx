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
import { AntDesign } from "@expo/vector-icons";

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
import { activateVehicle } from "@/src/screens/ManageVehicles/actions";

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
    description: vehicle?.description || "",
    mileage: (vehicle?.mileage && String(vehicle?.mileage)) || undefined,
    type: vehicle?.type || "",
    brand: vehicle?.brand || "",
    manual: vehicle?.manual ?? false,
    fuel_type: vehicle?.fuel_type || "",
    engine_capacity:
      (vehicle?.engine_capacity && String(vehicle?.engine_capacity)) ||
      undefined,
    passengers:
      (vehicle?.passengers && String(vehicle?.passengers)) || undefined,
    // model_year: vehicle?.model_year || "",
    asset:
      (vehicle?.asset && {
        file_path: "",
        filename: vehicle?.asset?.filename,
      }) ||
      undefined,
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
      updatePaginatedAsset,
    );

  const handleSetActive = () =>
    activateVehicle({
      active: !vehicle?.active,
      vehicle_id: vehicleId,
    })
      .then((res) => {
        AppToast(
          `Successfully ${vehicle?.active ? "de-activated" : "activated"} vehicle`,
          true,
        );

        updatePaginatedObject("userVehicles", vehicleId, {
          active: !vehicle?.active,
        });
      })
      .catch((err) => {
        const errorKey = err.response?.data?.error;

        if (errorKey === "missing_fields") {
          return AppToast("Model or Rent fields are empty");
        } else {
          AppToast();
          throw new Error("Set vehicle active error:", err);
        }
      });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
                  style={{ color: Colors.white, fontWeight: 700, fontSize: 16 }}
                >
                  {vehicle?.active ? "De-activate" : "Activate"}
                </Text>
              </CustomButton>
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
