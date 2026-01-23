import React, { ReactNode, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../../../constants/ui";

import { styles } from "./styles/input";

type PasswordEyeProps = {
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword: boolean;
};

const PasswordEye = (props: PasswordEyeProps) => {
  const { setShowPassword, showPassword } = props;
  return (
    <Pressable onPress={() => setShowPassword((v) => !v)}>
      <Feather
        name={showPassword ? "eye" : "eye-off"}
        size={20}
        color={Colors.mediumGrey}
      />
    </Pressable>
  );
};

type DropDownCaretProps = {
  displayDropdown: boolean;
};

const DropDownCaret = (props: DropDownCaretProps) => {
  const { displayDropdown } = props;

  return (
    <Feather
      name={!displayDropdown ? "chevron-down" : "chevron-up"}
      color={Colors.black}
      size={24}
      style={{ position: "absolute", right: 8 }}
    />
  );
};

type PostMediaIconsProps = {
  customStyle?: any;
};

const PostMediaIcons = (props: PostMediaIconsProps) => {
  const { customStyle } = props;

  return (
    <View style={[{ flexDirection: "row", gap: 8 }, customStyle]}>
      <Ionicons name="image-outline" size={16} color={Colors.midToneGrey} />
      <Ionicons
        name="person-add-outline"
        size={14}
        color={Colors.midToneGrey}
      />
    </View>
  );
};

type FieldsetProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  inputIcon?: string;
  errors?: FieldErrors;
  inputIconSize?: number;
  type?: "input" | "password" | "text" | "dropdown";
  placeholder?: string;
  placeholderTextColor?: string;
  numberOfLines?: number;
  optional?: boolean;
  required?: boolean;
  showMediaIcons?: boolean;
  decimalPad?: boolean;
  customStyles?: any;
  editable?: boolean;
};

export const Fieldset = <T extends FieldValues>(props: FieldsetProps<T>) => {
  const {
    control,
    name,
    label,
    inputIcon,
    errors,
    inputIconSize = 20,
    type = "input",
    placeholder,
    placeholderTextColor = Colors.midToneGrey,
    numberOfLines = 1,
    optional = false,
    showMediaIcons = false,
    required,
    decimalPad = false,
    customStyles,
    editable = true,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const { fonts } = useTheme();

  const inputStyle = type === "text" ? styles.textArea : styles.input;

  const RightInputIcon: VoidFunction | ReactNode = () => {
    switch (type) {
      case "password":
        return (
          <PasswordEye
            setShowPassword={(val) => setShowPassword(val)}
            showPassword={showPassword}
          />
        );

      case "dropdown":
        return <DropDownCaret displayDropdown={displayDropdown} />;

      default:
        return null;
    }
  };

  return (
    <View style={[customStyles]}>
      <View style={styles.label}>
        <Text style={[{ fontSize: 15, lineHeight: 20 }, fonts.bodyMedium]}>
          {label}
        </Text>
        {required ? (
          <Text style={{ color: Colors.primaryBlue, paddingLeft: 3 }}>*</Text>
        ) : (
          <Text
            style={{ color: Colors.lightGrey, paddingLeft: 3, fontSize: 13 }}
          >
            (optional)
          </Text>
        )}
      </View>

      <View
        style={[
          styles.inputContainer,
          type === "text" && {
            padding: 8,
            // paddingHorizontal: 8,
          },
          showMediaIcons && {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          },
        ]}
      >
        {/* {!(type === 'text') && !(type === 'dropdown') && (
          <MaterialIcons
            name={inputIcon as keyof typeof MaterialIcons.glyphMap}
            size={inputIconSize}
            style={[styles.inputIcon, { marginRight: 4 }]}
          />
        )} */}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[inputStyle, { fontFamily: "NationalPark_500Medium" }]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              spellCheck={false}
              textContentType="none"
              importantForAutofill="no"
              editable={editable}
              {...(decimalPad && { keyboardType: "decimal-pad" })}
              {...(showPassword && { secureTextEntry: true })}
              {...(type === "text" && {
                multiline: true,
                numberOfLines: numberOfLines || 10,
              })}
              {...(type === "dropdown" && {
                onTouchStart: () => setDisplayDropdown(!displayDropdown),
              })}
            />
          )}
        />
        {RightInputIcon() as ReactNode}
        {showMediaIcons && <PostMediaIcons />}
      </View>
      {errors?.[`${name}`] && (
        <Text style={{ color: Colors.lightRed, marginLeft: 8, marginTop: -10 }}>
          {(errors[`${name}`] as FieldError).message}
        </Text>
      )}
    </View>
  );
};
