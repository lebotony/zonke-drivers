import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@/constants/ui";
import profilePic from "@/assets/images/profile_pic.png";
import { Fieldset } from "@/src/components/form/fieldset/input";
import { CustomButton } from "@/src/components/elements/button";
import { Avatar } from "@/src/components/visual/avatar";
import { DropdownInput } from "@/src/components/dropdown";

import { styles } from "../styles/profileSetup";
import { SetUpOneSchema } from "../schema";

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
  {
    slug: "platforms",
    label: "Platforms",
    type: "dropdown",
    placeholder: "Select",
  },
  {
    slug: "licences",
    label: "Licences",
    type: "dropdown",
    placeholder: "Select",
  },
];

type FormValues = z.infer<typeof SetUpOneSchema>;

type ProfileSetupProps = {
  setStep: (val: number) => void;
};

export const ProfileSetup = (props: ProfileSetupProps) => {
  const { setStep } = props;

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SetUpOneSchema),
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Profile Set Up</Text>
      <View style={styles.avatarWrapper}>
        <Avatar width={100} source={profilePic} round />
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons
            name="drive-file-rename-outline"
            color={Colors.primaryBlue}
            size={21}
          />
        </TouchableOpacity>
        <Text style={styles.skipBtn} onPress={() => router.replace("/(tabs)")}>
          Skip
        </Text>
      </View>

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
              {...(item.type === "dropdown" && { type: "dropdown" })}
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

      <Fieldset
        label="Bio"
        name="bio"
        inputIconSize={23}
        control={control}
        placeholder="Tell clients about your experience, specialties and what you offer"
        type="text"
        numberOfLines={4}
        optional
        errors={errors}
      />

      <CustomButton
        color="primaryBlue"
        haptics="light"
        onPress={() => setStep(2)}
        customStyle={{ flexGrow: 1, marginBottom: 20, marginTop: 10 }}
      >
        <Text style={{ color: Colors.white, fontWeight: 700, fontSize: 17 }}>
          Next
        </Text>
      </CustomButton>
    </ScrollView>
  );
};
