import { View, TextInput, ViewStyle } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { Colors } from "../../../constants/ui";

import { styles } from "./styles";

type SearchComponentProps = {
  height?: number;
  placeholder?: string;
  customStyle?: ViewStyle;
};

export const SearchComponent = (props: SearchComponentProps) => {
  const { height = 34, placeholder, customStyle } = props;

  return (
    <View style={[{ height: height }, customStyle]}>
      <View style={[styles.inputWrapper, { maxHeight: height }, customStyle]}>
        <EvilIcons name="search" size={20} color="black" />
        <TextInput
          onChangeText={() => {}}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGrey}
          cursorColor={Colors.mediumGrey}
          textAlignVertical="center"
          underlineColorAndroid="transparent"
          maxLength={50}
          keyboardType="web-search"
          enablesReturnKeyAutomatically
          autoComplete="off"
          returnKeyType="search"
          spellCheck={false}
        />
      </View>
    </View>
  );
};
