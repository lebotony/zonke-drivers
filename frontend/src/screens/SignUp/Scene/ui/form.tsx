import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Control, FieldErrors } from "react-hook-form";

import { Fieldset } from "@/src/components/form/fieldset/input";

import { styles } from "../styles/form";
import { SignInFormValues, SignUpFormValues } from "./login";
import { Colors } from "@/constants/ui";

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

  const customErrors = isSignUp ? errors : undefined;

  return (
    <View>
      {isSignUp && (
        <>
          <Fieldset
            control={control}
            name="first_name"
            label="First Name"
            inputIcon="person-outline"
            placeholder="John"
            inputIconSize={22}
            errors={customErrors}
            customStyles={{ marginBottom: 16 }}
            required
          />
          <Fieldset
            control={control}
            name="last_name"
            label="Last Name"
            inputIcon="person-outline"
            placeholder="Doe"
            inputIconSize={22}
            errors={customErrors}
            customStyles={{ marginBottom: 16 }}
            required
          />
          <Fieldset
            control={control}
            name="email"
            label="Email"
            inputIcon="mail-outline"
            placeholder="example@gmail.com"
            errors={customErrors}
            customStyles={{ marginBottom: 20 }}
          />
        </>
      )}

      {isSignUp && (
        <Text style={styles.signupNote}>
          <Text style={styles.signupNoteHighlight}>Login Credentials</Text>
          <Text> — Required for signing in</Text>
        </Text>
      )}

      <View
        style={[
          isSignUp && styles.loginFieldsContainer,
          !isSignUp && { marginBottom: 20 },
        ]}
      >
        <Fieldset
          control={control}
          name="username"
          label="Username"
          inputIcon="mail-outline"
          placeholder="john_doe"
          errors={customErrors}
          required
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
            placeholder="Enter your password"
            errors={customErrors}
            required
          />
        </View>

        {isSignUp && (
          <Fieldset
            control={control}
            name="confirm_password"
            label="Confirm Password"
            inputIcon="lock-outline"
            type="password"
            placeholder="Re-enter your password"
            errors={customErrors}
            required
          />
        )}
      </View>
    </View>
  );
};
