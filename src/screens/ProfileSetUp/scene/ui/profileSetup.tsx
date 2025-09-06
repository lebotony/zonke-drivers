import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@constants/ui";
import { Avatar } from "@components/visual/avatar";
import profilePic from "@assets/images/profile_pic.png";
import { Fieldset } from "@components/form/fieldset/input";
import { CustomButton } from "@components/elements/button";

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
    slug: "location",
    label: "Location",
    icon: "location-on",
    placeholder: "1327 Brooklyn Street, New York, USA",
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

      <View>
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
      </View>

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
