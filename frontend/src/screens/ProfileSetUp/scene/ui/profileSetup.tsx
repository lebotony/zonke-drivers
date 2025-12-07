import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import { find, isEmpty, isEqual } from "lodash";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { router } from "expo-router";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

import { Colors } from "@/constants/ui";
import { Fieldset } from "@/src/components/form/fieldset/input";
import { CustomButton } from "@/src/components/elements/button";
import { Avatar } from "@/src/components/visual/avatar";
import { DropdownInput } from "@/src/components/dropdown";
import {
  LICENCES,
  PLATFORM_FILTERS,
  PLATFORM_LABELS,
} from "@/src/screens/Drivers/Scene/utils/constants";
import { pickImage } from "@/src/helpers/pickImage";
import { ModalDatePicker } from "@/src/components/elements/datePicker";
import { useCustomQuery } from "@/src/useQueryContext";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { BackArrow } from "@/src/components/BackArrow/header";
import { Spinner } from "@/src/components/elements/Spinner";

import { styles } from "../styles/profileSetup";
import { DriverProfileSchema, OwnerProfileSchema } from "../schema";
import { SelectLicenceArea, SelectPlatformArea } from "./selectAreas";
import {
  fetchDriverProfile,
  updateDriver,
  updateUserAsset,
  updateVehicleUser,
} from "../../actions";

export type DriverFormValues = z.infer<typeof DriverProfileSchema>;
export type OwnerFormValues = z.infer<typeof OwnerProfileSchema>;

type ProfileSetupProps = {};

export const ProfileSetup = (props: ProfileSetupProps) => {
  const {} = props;

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { user, driverProfile } = getCachedData(["user", "driverProfile"]);

  const isDriver = user?.role === "driver";

  const initialLocation = isDriver
    ? driverProfile?.location || {}
    : user?.location || {};

  const formValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    dob: driverProfile?.dob || "",
    location: initialLocation,
    platforms: driverProfile?.platforms || [],
    licences: driverProfile?.licences || [],
    experience:
      (driverProfile?.experience && String(driverProfile?.experience)) || "",
    description: driverProfile?.description || "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DriverFormValues | OwnerFormValues>({
    resolver: zodResolver(isDriver ? DriverProfileSchema : OwnerProfileSchema),
    defaultValues: formValues,
  });

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

  const { asset: currentAsset, ...currentValues } = watch();
  const isSameForm = isEqual(currentValues, formValues);

  useEffect(() => {
    if (isDriver && !driverProfile) {
      fetchDriverProfile().then((response) =>
        queryClient.setQueryData(["driverProfile"], response)
      );
    }
  }, [isDriver]);

  useEffect(() => {
    if (driverProfile) {
      reset(formValues);
    }
  }, [driverProfile]);

  const selectedPlatforms = watch("platforms");
  const selectedLicences = watch("licences");
  const pickedAsset = watch("asset");

  const isProfilePicPresent =
    !isEmpty(pickedAsset?.file_path) || !isEmpty(user?.asset?.url);

  const handleAddPlatform = (item: string) => {
    const selectedValue = PLATFORM_FILTERS.filter((p) => p.value === item)[0]
      .value;

    if (!selectedPlatforms?.includes(selectedValue)) {
      setValue("platforms", [...(selectedPlatforms || []), selectedValue]);
    }
  };

  const handleRemovePlatform = (item: string) => {
    setValue(
      "platforms",
      selectedPlatforms?.filter((platform) => platform !== item)
    );
  };

  const handleAddLicence = (item: string) => {
    const licence = (find(LICENCES, { name: item }) as Licence).slug;

    if (!selectedLicences?.includes(item)) {
      setValue("licences", [...(selectedLicences || []), licence]);
    }
  };

  const handleRemoveLicences = (item: string) => {
    setValue(
      "licences",
      selectedLicences?.filter((licence) => licence !== item)
    );
  };

  const handleEditProfile = () => {
    if (isDriver) {
      handleSubmit((formData) =>
        updateDriver(formData)
          .then((response) => {
            AppToast("Driver profile updated successfully", true);

            const { user, ...otherParams } = response;

            queryClient.setQueryData(["user"], user);
            queryClient.setQueryData(["driverProfile"], otherParams);
            router.back();
          })
          .catch((err) => err)
      )();
    } else {
      handleSubmit((formData) =>
        updateVehicleUser(user.id, formData)
          .then((response) => {
            AppToast("Profile updated successfully", true);
            queryClient.setQueryData(["user"], response);
            router.back();
          })
          .catch((err) => {
            AppToast();
            throw new Error("Error while updating user: ", err);
          })
      )();
    }
  };

  const updatePaginatedAsset = (asset: Asset) => {
    queryClient.setQueryData(["user"], { ...user, asset: asset });
    queryClient.setQueryData(["driverProfile"], {
      ...driverProfile,
      asset_url: asset?.url,
    });
  };

  const handleSelectImage = () =>
    pickImage(
      setValue,
      [1, 1],
      updateUserAsset,
      user?.id,
      updatePaginatedAsset
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          Platform.OS === "android" && {
            paddingBottom: keyboardVisible ? keyboardHeight : 0,
          }
        }
      >
        <BackArrow left={0} />
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          onPress={handleSelectImage}
          style={[
            styles.avatarWrapper,
            isProfilePicPresent && { borderWidth: 0 },
          ]}
        >
          <Avatar
            width={130}
            source={
              isProfilePicPresent &&
              (pickedAsset?.file_path || user?.asset?.url)
            }
            round
            backgroundColor={false}
          />
          <TouchableOpacity
            onPress={handleSelectImage}
            style={styles.editButton}
          >
            <MaterialIcons
              name="drive-file-rename-outline"
              color={Colors.mrDBlue}
              size={21}
            />
          </TouchableOpacity>
          {!isProfilePicPresent && (
            <Text style={styles.imageText}>Select an image</Text>
          )}
        </TouchableOpacity>

        <Fieldset
          label="First Name"
          name="first_name"
          inputIcon="person-outline"
          control={control}
          placeholder="John"
          errors={errors}
          required
        />

        <Fieldset
          label="Last Name"
          name="last_name"
          inputIcon="person-outline"
          control={control}
          placeholder="Doe"
          errors={errors}
          required
        />

        <Fieldset
          label="Email"
          name="email"
          inputIcon="mail"
          control={control}
          placeholder="Doe"
          errors={errors}
          required
        />

        <DropdownInput
          name="location"
          required
          label="Location"
          value={initialLocation.address}
          setValue={setValue}
          placeholder="Search location..."
        />

        {isDriver && (
          <>
            <View style={{ flexDirection: "row", gap: 7 }}>
              <Text style={styles.driverProfileText}>
                Driver Profile Fields
              </Text>
              <Ionicons
                name="speedometer"
                size={23}
                color={Colors.mediumDarkGrey}
              />
            </View>
            <View
              style={{
                borderColor: Colors.tealGreen,
                borderWidth: 2,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 18,
                marginBottom: 10,
              }}
            >
              <Fieldset
                label="Date of Birth"
                name="dob"
                inputIcon="event"
                control={control}
                placeholder="2001-10-20"
                errors={errors}
                required
              />

              <ModalDatePicker setValue={setValue} />
            </View>

            <SelectLicenceArea
              onAddItem={(value: string) => handleAddLicence(value)}
              onRemoveItem={handleRemoveLicences}
              options={LICENCES.map((licence) => licence.name)}
              selectedItems={selectedLicences}
              label="Licences"
            />

            <SelectPlatformArea
              onAddItem={(value: string) => handleAddPlatform(value)}
              onRemoveItem={handleRemovePlatform}
              options={PLATFORM_LABELS}
              selectedItems={selectedPlatforms}
              label="Platforms"
            />

            <Fieldset
              label="Years of Experience"
              name="experience"
              inputIcon="access-time"
              control={control}
              placeholder="12"
              errors={errors}
              required
            />

            <Fieldset
              label="Bio"
              name="description"
              inputIconSize={23}
              control={control}
              placeholder="Tell clients about your experience, specialties and what you offer..."
              type="text"
              numberOfLines={4}
              optional
              errors={errors}
            />
          </>
        )}

        <CustomButton
          onPress={isSameForm ? undefined : handleEditProfile}
          haptics="light"
          customStyle={{
            flexGrow: 1,
            marginBottom: 20,
            marginTop: 10,
            flex: 1,
            backgroundColor: isSameForm ? Colors.lightGrey : Colors.mrDBlue,
          }}
        >
          <Text style={{ color: Colors.white, fontWeight: 600, fontSize: 16 }}>
            Edit Profile
          </Text>
        </CustomButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
