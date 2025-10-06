import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Control, FieldErrors } from "react-hook-form";

import { styles } from "../styles/form";
import { SignInFormValues, SignUpFormValues } from "./login";
import { Fieldset } from "@/src/components/form/fieldset/input";

type FormProps = {
  isSignUp: boolean;
  control: Control<
    SignUpFormValues | SignInFormValues,
    any,
    SignUpFormValues | SignInFormValues
  >;
  errors: FieldErrors<SignUpFormValues | SignInFormValues>;
};

export const Form = (props: FormProps) => {
  const { isSignUp, control, errors } = props;

  return (
    <View>
      {isSignUp && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Fieldset
            control={control}
            name="first_name"
            label="First Name"
            inputIcon="person-outline"
            placeholder="John Doe"
            inputIconSize={22}
            errors={errors}
            customStyles={{ flex: 1 }}
          />
          <Fieldset
            control={control}
            name="last_name"
            label="Last Name"
            inputIcon="person-outline"
            placeholder="John Doe"
            inputIconSize={22}
            errors={errors}
            customStyles={{ flex: 1 }}
          />
        </View>
      )}
      {/* 
      <Fieldset
        control={control}
        name="username"
        label="Username"
        inputIcon="person-outline"
        placeholder="john_doe"
        inputIconSize={22}
        errors={errors}
      /> */}

      <Fieldset
        control={control}
        name="email"
        label="Email"
        inputIcon="mail-outline"
        placeholder="example@gmail.com"
        errors={errors}
      />

      <View>
        {!isSignUp && (
          <TouchableOpacity style={styles.forgotPasswordWrapper}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        )}
        <Fieldset
          control={control}
          name="password"
          label="Password"
          inputIcon="lock-outline"
          type="password"
          placeholder="********"
          errors={errors}
        />
      </View>

      {isSignUp && (
        <Fieldset
          control={control}
          name="confirm_password"
          label="Confirm Password"
          inputIcon="lock-outline"
          type="password"
          placeholder="********"
          errors={errors}
        />
      )}
    </View>
  );
};
