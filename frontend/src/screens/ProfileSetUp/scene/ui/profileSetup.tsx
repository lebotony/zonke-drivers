import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { isEmpty } from "lodash";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

import { Colors } from "@/constants/ui";
import { Fieldset } from "@/src/components/form/fieldset/input";
import { CustomButton } from "@/src/components/elements/button";
import { Avatar } from "@/src/components/visual/avatar";
import { DropdownInput } from "@/src/components/dropdown";
import {
  PLATFORM_FILTERS,
  PLATFORM_LABELS,
} from "@/src/screens/Drivers/Scene/utils/constants";
import { pickImage } from "@/src/helpers/pickImage";
import { ModalDatePicker } from "@/src/components/elements/datePicker";
import { useCustomQuery } from "@/src/useQueryContext";

import { styles } from "../styles/profileSetup";
import { DriverProfileSchema, OwnerProfileSchema } from "../schema";
import { SelectLicenceArea, SelectPlatformArea } from "./selectAreas";
import { LICENCES } from "../../constants";
import {
  fetchDriverProfile,
  updateDriver,
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

  const formValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    dob: driverProfile?.dob || "",
    location: user.location || "",
    platforms: driverProfile?.platforms || [],
    // licences: [],
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

  useEffect(() => {
    if (isDriver) {
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
    !isEmpty(pickedAsset?.file_path) || !isEmpty(user.asset.url);

  const handleAddPlatform = (item: string) => {
    const selectedValue = PLATFORM_FILTERS.filter((p) => p.slug === item)[0]
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
    if (!selectedLicences?.includes(item)) {
      setValue("licences", [...(selectedLicences || []), item]);
    }
  };

  const handleRemoveLicences = (item: string) => {
    setValue(
      "licences",
      selectedLicences?.filter((licence) => licence !== item)
    );
  };

  const handleEditProfile = () => {
    console.log(watch());

    if (isDriver) {
      handleSubmit((formData) =>
        updateDriver(formData)
          .then((response) => {
            console.log("33333333333333333", response.user);
            queryClient.setQueryData(["user"], response.user);
            queryClient.setQueryData(["driverProfile"], response);
          })
          .catch((err) => err)
      )();
    } else {
      handleSubmit((formData) =>
        updateVehicleUser(user.id, formData)
          .then((response) => queryClient.setQueryData(["user"], response))
          .catch((err) => err)
      )();
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity
        onPress={() => pickImage(setValue, [1, 1])}
        style={[
          styles.avatarWrapper,
          isProfilePicPresent && { borderWidth: 0 },
        ]}
      >
        <Avatar
          width={130}
          source={
            isProfilePicPresent && (pickedAsset?.file_path || user.asset.url)
          }
          round
        />
        <TouchableOpacity style={styles.editButton}>
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
        inputIcon="person-outline"
        control={control}
        placeholder="Doe"
        errors={errors}
        required
      />

      {isDriver && (
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
            placeholder="20/10/2001"
            errors={errors}
            required
          />

          <ModalDatePicker setValue={setValue} />
        </View>
      )}

      <DropdownInput
        name="location"
        required
        label="Location"
        value={
          !isEmpty(user.location) ? user?.location?.address?.join(", ") : ""
        }
        setValue={setValue}
        placeholder="Search location..."
      />

      {isDriver && (
        <>
          <SelectLicenceArea
            onAddItem={(value: string) => handleAddLicence(value)}
            onRemoveItem={handleRemoveLicences}
            options={LICENCES}
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
        onPress={handleEditProfile}
        haptics="light"
        customStyle={{
          flexGrow: 1,
          marginBottom: 20,
          marginTop: 10,
          flex: 1,
        }}
      >
        <Text style={{ color: Colors.white, fontWeight: 600, fontSize: 16 }}>
          Edit Profile
        </Text>
      </CustomButton>
    </ScrollView>
  );
};
