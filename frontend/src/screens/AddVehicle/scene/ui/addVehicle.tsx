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
import { ImageLoadingOverlay } from "@/src/components/elements/ImageLoadingOverlay";
import { getCountryByName } from "@/constants/countries";
import { validateVehicleActivation } from "@/src/helpers/validateVehicleActivation";
import { VehicleActivationModal } from "@/src/components/modal/VehicleActivationModal";

import { styles } from "../styles/addVehicle";
import { CardFormDef } from "../utils/cardFormDef";
import { Card } from "./card";
import { FormSchema, FormSchemaRent, FormSchemaSale } from "../../schema";
import { AddVehicleForm } from "./form";
import {
  createVehicle,
  updateVehicle,
  updateVehicleAsset,
} from "../../actions";

export type AddVehicleFormValues = z.infer<typeof FormSchema>;

export const AddVehicle = () => {
  const { id, showActivationModal: showModalParam } = useLocalSearchParams();
  const vehicleId = Array.isArray(id) ? id[0] : id;

  const { updatePaginatedObject, addItemToPaginatedList } = usePaginatedCache();

  const { getCachedData } = useCustomQuery();
  const { userVehicles, user } = getCachedData(["userVehicles", "user"]);

  const isNewVehicle = vehicleId === "new" || vehicleId == undefined;
  const vehicle = !isNewVehicle
    ? find(userVehicles, { id: vehicleId })
    : undefined;

  // Determine initial mode based on vehicle data
  const [isForSale, setIsForSale] = useState(vehicle?.on_sale ?? false);

  const formValues = {
    model: vehicle?.model || "",
    mileage: (vehicle?.mileage && String(vehicle?.mileage)) || "",
    payments_per_month:
      (vehicle?.payments_per_month && String(vehicle?.payments_per_month)) || "",
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
    price_fixed: (vehicle?.price_fixed?.value && String(vehicle.price_fixed.value)) || "",
    sale_price: (vehicle?.sale_price?.value && String(vehicle.sale_price.value)) || "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddVehicleFormValues>({
    resolver: zodResolver(isForSale ? FormSchemaSale : FormSchemaRent),
    defaultValues: formValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (vehicle) {
      reset(formValues);
      setIsForSale(vehicle.on_sale ?? false);
    }
  }, [vehicle?.id, vehicle?.on_sale]);

  // Handle mode change
  const handleModeChange = (saleMode: boolean) => {
    setIsForSale(saleMode);
    reset({
      ...watch(),
      price_fixed: "",
      sale_price: "",
      payments_per_month: "",
    });
  };

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [missingFields, setMissingFields] = useState<
    ("model" | "image" | "price")[]
  >([]);

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

  useEffect(() => {
    if (showModalParam === "true" && vehicle) {
      const validation = validateVehicleActivation(vehicle);
      if (!validation.isValid) {
        setMissingFields(validation.missingFields);
        setShowActivationModal(true);
      }
    }
  }, [showModalParam, vehicle]);

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
    // Get user's country and derive currency from it
    const userCountry = user?.location?.country;
    const countryInfo = userCountry ? getCountryByName(userCountry) : undefined;
    const currency = countryInfo?.currencySymbol || "$"; // Fallback to "$" if not found

    const priceFixed = !isForSale && data.price_fixed
      ? { value: Number(data.price_fixed), currency }
      : undefined;
    const salePrice = isForSale && data.sale_price
      ? { value: Number(data.sale_price), currency }
      : undefined;

    // Automatically set active to true only when completing vehicle for the first time
    // Check if vehicle was incomplete before, and is now complete after form submission
    let active: boolean | undefined = undefined;

    // Build the updated vehicle object with new form data
    const updatedVehicle: Partial<Vehicle> = {
      model: data.model,
      asset: vehicle?.asset || data.asset,
      on_sale: isForSale,
      price_fixed: priceFixed,
      sale_price: salePrice,
    };

    const newValidation = validateVehicleActivation(updatedVehicle);

    if (isNewVehicle) {
      // For new vehicles, auto-activate if all fields are complete
      if (newValidation.isValid) {
        active = true;
      }
    } else if (vehicle) {
      // For existing vehicles, only auto-activate if it was previously incomplete
      const previousValidation = validateVehicleActivation(vehicle);
      const wasIncomplete = !previousValidation.isValid;
      const isNowComplete = newValidation.isValid;

      if (wasIncomplete && isNowComplete) {
        active = true;
      }
    }

    const params: any = {
      ...data,
      on_sale: isForSale,
      price_fixed: priceFixed,
      sale_price: salePrice,
      ...(active !== undefined && { active }),
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

  const handleSelectImage = () => {
    // Wrap updateVehicleAsset to pass the on_sale state
    const uploadAssetWithSaleStatus = (asset: any, id?: string) =>
      updateVehicleAsset(asset, id, isForSale);

    return pickImage(
      setValue,
      undefined,
      uploadAssetWithSaleStatus,
      vehicleId,
      updatePaginatedAsset,
      setIsUploadingImage,
    );
  };

  const handleSetActive = () => {
    // If trying to activate (not deactivate), validate first
    if (!vehicle?.active) {
      const validation = validateVehicleActivation(vehicle);
      if (!validation.isValid) {
        setMissingFields(validation.missingFields);
        setShowActivationModal(true);
        return;
      }
    }

    // Proceed with activation/deactivation
    activateVehicle({
      active: !vehicle?.active,
      vehicle_id: vehicleId,
    })
      .then(() => {
        AppToast(
          `Successfully ${vehicle?.active ? "de-activated" : "activated"} vehicle`,
          true,
        );

        updatePaginatedObject("userVehicles", vehicleId, {
          active: !vehicle?.active,
        });
      })
      .catch((err) => {
        AppToast();
        throw new Error("Set vehicle active error:", err);
      });
  };

  const driver = !isNewVehicle && vehicle?.vehicle_drivers[0]?.driver;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS === "android" && {
              paddingBottom: keyboardVisible ? keyboardHeight : 0,
            },
          ]}
        >
          {/* Premium Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>
                {vehicle ? "Update Your Vehicle" : "Add Your Vehicle"}
              </Text>
              <Text style={styles.headerSubtitle}>
                {vehicle
                  ? "Keep your vehicle details up to date"
                  : "Share your vehicle with our community of drivers"}
              </Text>
            </View>
          </View>

          {/* Rent/Sale Toggle Switch */}
          <View style={styles.toggleSection}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isForSale && styles.toggleButtonActive,
              ]}
              onPress={() => handleModeChange(false)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  !isForSale && styles.toggleButtonTextActive,
                ]}
              >
                For Rent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isForSale && styles.toggleButtonActive,
              ]}
              onPress={() => handleModeChange(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  isForSale && styles.toggleButtonTextActive,
                ]}
              >
                For Sale
              </Text>
            </TouchableOpacity>
          </View>

          {/* Premium Image Upload Card */}
          <View style={styles.imageCard}>
            <Text style={styles.sectionLabel}>Vehicle Photo</Text>
            <TouchableOpacity
              onPress={isUploadingImage ? undefined : handleSelectImage}
              style={styles.imageUploadArea}
              disabled={isUploadingImage}
              activeOpacity={0.7}
            >
              {isVehiclePic ? (
                <>
                  <Image
                    source={vehicleImage}
                    style={styles.uploadedImage}
                    contentFit="cover"
                  />
                  <View style={styles.imageEditBadge}>
                    <AntDesign name="edit" size={16} color={Colors.white} />
                  </View>
                </>
              ) : (
                <View style={styles.emptyImageState}>
                  <View style={styles.uploadIconContainer}>
                    <AntDesign
                      name="camerao"
                      size={32}
                      color={Colors.mrDBlue}
                    />
                  </View>
                  <Text style={styles.uploadPromptText}>
                    Tap to upload photo
                  </Text>
                  <Text style={styles.uploadHintText}>
                    Show off your vehicle's best angle
                  </Text>
                </View>
              )}
              <ImageLoadingOverlay isLoading={isUploadingImage} />
            </TouchableOpacity>
          </View>

          {/* Driver Assignment Section - Only for rental vehicles */}
          {!isNewVehicle && !isForSale && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Current Driver</Text>
              <View style={styles.driverCard}>
                <View style={styles.driverInfo}>
                  <View style={styles.driverAvatarContainer}>
                    {driver ? (
                      <Image
                        source={driver?.asset_url}
                        style={styles.driverAvatar}
                      />
                    ) : (
                      <MaterialIcons
                        name="person-outline"
                        size={28}
                        color={Colors.mediumGrey}
                      />
                    )}
                  </View>
                  <View style={styles.driverTextContainer}>
                    <Text
                      style={[
                        styles.driverName,
                        !driver && { color: Colors.mediumGrey },
                      ]}
                    >
                      {driver
                        ? `${driver.first_name} ${driver.last_name}`
                        : "No driver assigned"}
                    </Text>
                    {driver && (
                      <Text style={styles.driverSubtext}>Active driver</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.assignButton}
                  onPress={() =>
                    router.push(`/vehicleDriverSearch/${vehicle?.id}`)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.assignButtonText}>
                    {driver ? "Change" : "Assign"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Vehicle Type & Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Vehicle Type & Details</Text>
            <View style={styles.cardsGroup}>
              {CardFormDef.map((card, index) => (
                <Card
                  key={`${card.label}-${index}`}
                  card={card}
                  setValue={setValue}
                  watch={watch}
                />
              ))}
            </View>
          </View>

          {/* Specifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Specifications & Pricing</Text>
            <AddVehicleForm control={control} errors={errors} isForSale={isForSale} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {vehicle && (
              <View style={styles.activationSection}>
                <View style={styles.activationInfo}>
                  <AntDesign
                    name="infocirlceo"
                    size={18}
                    color={Colors.mediumGrey}
                  />
                  <Text style={styles.activationText}>
                    Vehicle must be activated to appear in searches
                  </Text>
                </View>
                <CustomButton
                  haptics="light"
                  onPress={handleSetActive}
                  customStyle={[
                    styles.activationButton,
                    {
                      backgroundColor: vehicle?.active
                        ? Colors.lightRed
                        : Colors.lightGreen,
                    },
                  ]}
                >
                  <Text style={styles.activationButtonText}>
                    {vehicle?.active
                      ? "Deactivate Vehicle"
                      : "Activate Vehicle"}
                  </Text>
                </CustomButton>
              </View>
            )}

            <CustomButton
              haptics="light"
              onPress={
                isSameForm || isSubmitting ? undefined : handleSubmit(create)
              }
              customStyle={[
                styles.primaryButton,
                {
                  backgroundColor:
                    (isSameForm && vehicle) || isSubmitting
                      ? Colors.lightGrey
                      : Colors.mrDBlue,
                },
              ]}
              disabled={!!((isSameForm && vehicle) || isSubmitting)}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting
                  ? "Saving Changes..."
                  : vehicle
                    ? "Save Changes"
                    : `Add ${pickedType === "bike" ? "Bike" : "Vehicle"}`}
              </Text>
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {showActivationModal && (
        <VehicleActivationModal
          missingFields={missingFields}
          onDismiss={() => setShowActivationModal(false)}
        />
      )}
    </SafeAreaView>
  );
};
