import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { isEmpty } from "lodash";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { MaterialIcons } from "@expo/vector-icons";

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

import { styles } from "../styles/profileSetup";
import { SetUpOneSchema } from "../schema";
import { SelectLicenceArea, SelectPlatformArea } from "./selectAreas";
import { LICENCES } from "../../constants";
import { createDriver } from "../../actions";

const formDef = [
  {
    slug: "full_name",
    label: "Full Name",
    icon: "person-outline",
    placeholder: "John Doe",
  },
  {
    slug: "dob",
    icon: "event",
    label: "Date of Birth",
    placeholder: "20/10/2001",
  },
];

type FormValues = z.infer<typeof SetUpOneSchema>;

type ProfileSetupProps = {};

export const ProfileSetup = (props: ProfileSetupProps) => {
  const {} = props;

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SetUpOneSchema),
  });

  const selectedPlatforms = watch("platforms");
  const selectedLicences = watch("licences");
  const pickedAsset = watch("asset");

  const isProfilePicPresent = !isEmpty(pickedAsset?.file_path);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Profile Set Up</Text>
      <TouchableOpacity
        onPress={() => pickImage(setValue, [1, 1])}
        style={[
          styles.avatarWrapper,
          isProfilePicPresent && { borderWidth: 0 },
        ]}
      >
        <Avatar
          width={130}
          source={isProfilePicPresent && { uri: pickedAsset.file_path }}
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

      <View>
        {formDef.map((item, idx) => (
          <View key={`${item.slug} - ${idx}`}>
            <Fieldset
              label={item.label}
              name={item.slug as keyof FormValues}
              inputIcon={item.icon}
              control={control}
              placeholder={item.placeholder}
              errors={errors}
              required
            />
          </View>
        ))}
      </View>

      <DropdownInput
        name="location"
        required
        label="Locations"
        setValue={setValue}
        placeholder="Search location..."
      />

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
        name="bio"
        inputIconSize={23}
        control={control}
        placeholder="Tell clients about your experience, specialties and what you offer..."
        type="text"
        numberOfLines={4}
        optional
        errors={errors}
      />

      <CustomButton
        onPress={handleSubmit(createDriver)}
        haptics="light"
        customStyle={{ flexGrow: 1, marginBottom: 20, marginTop: 10 }}
      >
        <Text style={{ color: Colors.white, fontWeight: 600, fontSize: 16 }}>
          Add Driver Profile
        </Text>
      </CustomButton>
    </ScrollView>
  );
};
