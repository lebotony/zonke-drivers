import { useState } from "react";
import {
  View,
  TextInput,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/ui";

import { styles } from "./styles";

type SearchComponentProps = {
  height?: number;
  placeholder?: string;
  customStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange?: (value: string) => void;
};

export const SearchComponent = (props: SearchComponentProps) => {
  const {
    height = 44,
    placeholder = "Search",
    customStyle,
    inputStyle,
    onChange,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const focusAnim = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(focusAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(focusAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onChange?.("");
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0)", Colors.mrDBlue],
  });

  const iconColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.mediumGrey, Colors.mrDBlue],
  });

  return (
    <View style={[{ height: height }, customStyle]}>
      <Animated.View
        style={[
          styles.inputWrapper,
          { maxHeight: height },
          {
            borderWidth: 2,
            borderColor: borderColor,
          },
        ]}
      >
        <Animated.View style={[styles.iconContainer]}>
          <Ionicons name="search" size={20} color={isFocused ? Colors.mrDBlue : Colors.mediumGrey} />
        </Animated.View>
        <TextInput
          value={searchValue}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGrey}
          cursorColor={Colors.mrDBlue}
          textAlignVertical="center"
          underlineColorAndroid="transparent"
          maxLength={50}
          keyboardType="default"
          enablesReturnKeyAutomatically
          autoComplete="off"
          returnKeyType="search"
          spellCheck={false}
        />
        {searchValue.length > 0 && (
          <Pressable
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={18} color={Colors.mediumGrey} />
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};
