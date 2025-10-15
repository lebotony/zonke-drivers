import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { TextLogo } from "@/src/components/misc/textLogo";
import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import google_logo from "@/assets/images/google_logo.jpg";

import { styles } from "../styles/login";
import { Form } from "./form";
import { SignInSchema, SignUpSchema } from "../schema";
import { useAuth } from "@/src/authContext";

type LoginScreenProps = {};

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignInFormValues = z.infer<typeof SignInSchema>;

export const LoginScreen = (props: LoginScreenProps) => {
  const {} = props;
  const [isSignUp, setIsSignUp] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const { onRegister, onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues | SignInFormValues>({
    resolver: zodResolver(isSignUp ? SignUpSchema : SignInSchema),
  });

  console.log(watch());

  const onSubmit = (data: SignUpFormValues | SignInFormValues) => {
    if (isSignUp) {
      const { confirm_password, ...submitData } = data as SignUpFormValues;

      onRegister!(submitData);
    } else {
      onLogin!(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isSignUp && (
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <MaterialIcons name="keyboard-backspace" size={20} />
          </TouchableOpacity>
        )}
        <View style={styles.logoContainer}>
          <TextLogo size={isSignUp ? "medium" : "large"} />
        </View>

        <Text style={styles.title}>
          {!isSignUp ? "Login your account" : "Create your account"}
        </Text>

        <Form isSignUp={isSignUp} control={control} errors={errors} />

        {isSignUp && (
          <View style={styles.policy}>
            <Checkbox
              style={{ marginRight: 10, height: 15, width: 15 }}
              value={isChecked}
              color={Colors.mrDBlue}
              onValueChange={setChecked}
            />
            <Text style={styles.policyText}>I understood the </Text>
            <TouchableOpacity>
              <Text style={[styles.policyText, { color: Colors.mrDBlue }]}>
                terms & policy
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <CustomButton
          haptics="light"
          customStyle={{ borderRadius: 6, marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign Up" : "Log In"}
          </Text>
        </CustomButton>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <CustomButton
          color="skyLight"
          haptics="light"
          customStyle={{
            borderRadius: 6,
            flexDirection: "row",
            paddingVertical: 2,
          }}
          onPress={() => {}}
        >
          <Image source={google_logo} style={styles.googleIcon} />
          <Text style={[styles.googleText, { color: Colors.black }]}>
            Google
          </Text>
        </CustomButton>

        <View>
          <View style={styles.signupRow}>
            <Text style={{ color: Colors.midToneGrey, fontWeight: 600 }}>
              {isSignUp ? "Have an acount?" : " Don’t have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={[styles.signupText, { fontWeight: 700 }]}>
                {!isSignUp ? "Sign Up" : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.copyright}>© 2025 ZS, All right Reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
