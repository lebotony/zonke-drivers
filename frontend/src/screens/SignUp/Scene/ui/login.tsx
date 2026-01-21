import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { removeTrailingWhitespace } from "@/src/utils";
import { TextLogo } from "@/src/components/misc/textLogo";
import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
// import google_logo from "@/assets/images/google_logo.jpg";
import { useAuth } from "@/src/authContext";

import { styles } from "../styles/login";
import { Form } from "./form";
import { SignInSchema, SignUpSchema } from "../schema";

type LoginScreenProps = {
  toggleSales: () => void;
};

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignInFormValues = z.infer<typeof SignInSchema>;

export const LoginScreen = (props: LoginScreenProps) => {
  const { toggleSales } = props;

  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isDriver, setIsDriver] = useState(true);

  const { onRegister, onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues | SignInFormValues>({
    resolver: zodResolver(isSignUp ? SignUpSchema : SignInSchema),
  });

  const watchedFields = watch(["email", "password"]);

  useEffect(() => {
    if (!authError) return;
    setAuthError(null);
  }, [JSON.stringify(watchedFields)]);

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

  const onSubmit = async (data: SignUpFormValues | SignInFormValues) => {
    setAuthError(null);

    const sanitizedData: any = {};
    for (const key in data) {
      const value = (data as any)[key];
      sanitizedData[key] =
        typeof value === "string" ? removeTrailingWhitespace(value) : value;
    }

    try {
      if (isSignUp) {
        const { confirm_password, ...submitData } = sanitizedData;

        const signUpParams = {
          ...submitData,
          role: isDriver ? "driver" : "owner",
        };

        await onRegister!(signUpParams);
      } else {
        await onLogin!(sanitizedData as SignInFormValues);
      }
    } catch (err: any) {
      const message = err?.message || "Authentication failed";
      setAuthError(message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: keyboardVisible && isSignUp ? keyboardHeight : 20,
          }}
        >
          {isSignUp && (
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => setIsSignUp(!isSignUp)}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={22}
                color={Colors.darkCharcoalGrey}
              />
            </TouchableOpacity>
          )}

          <View style={styles.logoContainer}>
            <TextLogo size={isSignUp ? "medium" : "large"} />
          </View>

          <View style={styles.headerSection}>
            {!isSignUp && (
              <>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue to your account
                </Text>
              </>
            )}

            {isSignUp && (
              <>
                <Text style={styles.title}>
                  Create{" "}
                  <Text style={{ color: Colors.mrDBlue }}>
                    {isDriver ? "Driver" : "Owner"}
                  </Text>{" "}
                  Account
                </Text>
                <Text style={styles.subtitle}>
                  Join the Zonke Drivers community today
                </Text>
              </>
            )}
          </View>

          {isSignUp && (
            <View style={styles.switch}>
              <TouchableOpacity
                onPress={() => setIsDriver(false)}
                style={[styles.switchBtns, !isDriver && styles.activeSwitchBtn]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.switchText,
                    !isDriver && styles.activeSwitchText,
                  ]}
                >
                  Vehicle Owner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsDriver(true)}
                style={[styles.switchBtns, isDriver && styles.activeSwitchBtn]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.switchText,
                    isDriver && styles.activeSwitchText,
                  ]}
                >
                  Driver
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Form isSignUp={isSignUp} control={control} errors={errors} />

          {authError && (
            <View
              style={{
                backgroundColor: "rgba(235, 99, 75, 0.08)",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                marginBottom: 16,
                borderLeftWidth: 3,
                borderLeftColor: Colors.lightRed,
              }}
            >
              <Text
                style={{
                  color: Colors.lightRed,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {authError}
              </Text>
            </View>
          )}

          <CustomButton
            haptics="light"
            customStyle={{
              borderRadius: 12,
              marginTop: 4,
              height: 52,
              shadowColor: Colors.mrDBlue,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 2,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Text>
          </CustomButton>

          {!isSignUp && (
            <TouchableOpacity
              style={styles.vehicleSalesButton}
              onPress={() => toggleSales()}
              activeOpacity={0.85}
            >
              <Ionicons name="car-sport" size={24} color={Colors.white} />
              <Text style={styles.vehicleSalesButtonText}>
                Browse Vehicle Sales
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ flex: 1 }} />

          <View>
            <View style={styles.signupRow}>
              <Text style={styles.signupPrompt}>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.signupText}>
                  {!isSignUp ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.copyright}>
              © 2025 Zonke, All Rights Reserved
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
