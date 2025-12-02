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
import { MaterialIcons } from "@expo/vector-icons";

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

type LoginScreenProps = {};

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignInFormValues = z.infer<typeof SignInSchema>;

export const LoginScreen = (props: LoginScreenProps) => {
  const {} = props;

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

  console.log(watch());

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
          contentContainerStyle={
            isSignUp && { paddingBottom: keyboardVisible ? keyboardHeight : 0 }
          }
        >
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

          {!isSignUp && <Text style={styles.title}>Login your account</Text>}

          {isSignUp && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>Create </Text>
              <Text style={[styles.title, { color: Colors.mrDBlue }]}>
                {isDriver ? "Driver" : "Vehicle Owner"}
              </Text>
              <Text style={styles.title}> account</Text>
            </View>
          )}

          {isSignUp && (
            <View style={styles.switch}>
              <TouchableOpacity
                onPress={() => setIsDriver(!isDriver)}
                style={[styles.switchBtns, !isDriver && styles.activeSwitchBtn]}
              >
                <Text
                  style={[
                    styles.switchText,
                    !isDriver && { color: Colors.white },
                  ]}
                >
                  Vehicle Owner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsDriver(!isDriver)}
                style={[styles.switchBtns, isDriver && styles.activeSwitchBtn]}
              >
                <Text
                  style={[
                    styles.switchText,
                    isDriver && { color: Colors.white },
                  ]}
                >
                  Driver
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Form isSignUp={isSignUp} control={control} errors={errors} />

          {authError && (
            <Text
              style={{ color: Colors.lightRed, marginTop: 5, marginLeft: 8 }}
            >
              {authError}
            </Text>
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

          {/* <View style={styles.dividerRow}>
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
        </CustomButton> */}

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
