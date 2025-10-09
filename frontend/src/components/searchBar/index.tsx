import { View, TextInput, ViewStyle, TextStyle } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { Colors } from "../../../constants/ui";

import { styles } from "./styles";

type SearchComponentProps = {
  height?: number;
  placeholder?: string;
  customStyle?: ViewStyle;
  inputStyle?: TextStyle;
};

export const SearchComponent = (props: SearchComponentProps) => {
  const { height = 34, placeholder, customStyle, inputStyle } = props;

  return (
    <View style={[{ height: height }, customStyle]}>
      <View style={[styles.inputWrapper, { maxHeight: height }, customStyle]}>
        <TextInput
          onChangeText={() => {}}
          style={[styles.textInput, inputStyle]}
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
        <EvilIcons name="search" size={20} color="black" />
      </View>
    </View>
  );
};
