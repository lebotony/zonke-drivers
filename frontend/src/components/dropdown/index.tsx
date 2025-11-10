import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  UIManager,
  findNodeHandle,
  Dimensions,
  FlatList,
  StyleProp,
  ViewStyle,
  Keyboard,
  Platform,
  BackHandler,
  TextInput,
} from "react-native";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { Portal } from "react-native-paper";

import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

import { styles } from "./styles";
import { fetchSuggestions } from "@/src/helpers/locations";

type DropdownInputProps<T extends FieldValues> = {
  label: string;
  options?: string[];
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  placeholder?: string;
  menuWidth?: "full" | "auto" | number;
  menuStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  caretSize?: number;
  name: Path<T>;
  required?: boolean;
  setValue: UseFormSetValue<T>;
  placeholderTextColor?: string;
  value: string;
};

export const DropdownInput = <T extends FieldValues>({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  menuWidth = "full",
  menuStyle,
  inputStyle,
  caretSize = 24,
  name,
  setValue,
  required,
  placeholderTextColor = Colors.midToneGrey,
  value,
}: DropdownInputProps<T>) => {
  const [open, setOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState<LocationType[]>([]);

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);

  const isLocation = name === "location";

  const [layout, setLayout] = useState({
    dropdownTop: 0,
    dropdownLeft: 0,
    inputWidth: 0,
    inputHeight: 0,
    dropdownWidth: 0,
    dropdownHeight: 0,
    freeHeight: 0,
    freeWidth: 0,
    widestTextWidth: 0,
    caretWidth: 0,
  });

  const inputRef = useRef<View>(null);
  const dropdownRef = useRef<View>(null);
  const caretRef = useRef<View>(null);

  const measureInputPosition = (cb?: () => void) => {
    if (inputRef.current) {
      const handle = findNodeHandle(inputRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          const screenHeight = Dimensions.get("window").height;
          const screenWidth = Dimensions.get("window").width;
          setLayout((prev) => ({
            ...prev,
            dropdownTop: pageY + height,
            dropdownLeft: pageX,
            inputWidth: width,
            inputHeight: height,
            freeHeight: screenHeight - (pageY + height),
            freeWidth: Math.round(screenWidth - (width + 30) || 0),
          }));

          if (cb) cb();
        });
      }
    }
  };

  const measureCaretWidth = () => {
    if (caretRef.current) {
      const handle = findNodeHandle(caretRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width) => {
          setLayout((prev) => ({
            ...prev,
            caretWidth: width,
          }));
        });
      }
    }
  };

  useEffect(() => {
    const dimSub = Dimensions.addEventListener("change", () => {
      if (open) measureInputPosition();
    });

    const kbShowSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        if (open) measureInputPosition();
      }
    );
    const kbHideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        if (open) measureInputPosition();
      }
    );

    return () => {
      dimSub?.remove();
      kbShowSub?.remove();
      kbHideSub?.remove();
    };
  }, [open, keyboardHeight]);

  useEffect(() => {
    if (!open) return;

    const onBackPress = () => {
      setOpen(false);
      Keyboard.dismiss();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove();
    };
  }, [open]);

  useEffect(() => {
    measureCaretWidth();
    measureInputPosition();
  }, [layout.dropdownHeight]);

  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  const handleSelect = (value: string | LocationType) => {
    if (isLocation) {
      setValue(name, value, { shouldValidate: true });
      setQuery((value as LocationType).address);
    } else {
      onSelect!(value as string);
      setQuery(value as string);
    }

    setOpen(false);
  };

  const handleChange = (text: string) => {
    setQuery(text);

    if (isLocation) {
      fetchSuggestions(text, setResults, setOpen);
    }
  };

  let computedWidth;
  switch (menuWidth) {
    case "full":
      computedWidth = layout.inputWidth;
      break;
    case "auto":
      computedWidth = layout.widestTextWidth + 60;
      break;
    default:
      computedWidth = menuWidth;
      break;
  }

  const showAbove = layout.freeHeight <= 225;
  const dropdownPositionTop = showAbove
    ? layout.dropdownTop - (layout.dropdownHeight + layout.inputHeight) - 10
    : layout.dropdownTop + 10;

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>{label}</Text>
        {required && (
          <Text style={{ color: Colors.mrDBlue, paddingLeft: 3 }}>*</Text>
        )}
      </View>

      <Pressable
        ref={inputRef}
        style={[styles.inputBox, inputStyle]}
        onPress={() => {
          setOpen(!open);
        }}
        onLayout={() => {
          if (open) measureInputPosition();
        }}
      >
        <View style={styles.before} />
        <TextInput
          value={query}
          onChangeText={handleChange}
          numberOfLines={1}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          style={[
            styles.inputText,
            // !selectedValue && styles.placeholderText,
            { width: layout.inputWidth - layout.caretWidth * 2 },
          ]}
        />
        <View style={styles.caretWrapper} ref={caretRef}>
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={caretSize}
            color={Colors.black}
          />
        </View>
      </Pressable>

      {open && (
        <Portal>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <View
            ref={dropdownRef}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setLayout((prev) => ({
                ...prev,
                dropdownWidth: width,
                dropdownHeight: height,
              }));
            }}
            style={[
              styles.dropdownMenu,
              {
                top: dropdownPositionTop,
                left: Math.max(
                  layout.dropdownLeft + layout.inputWidth - computedWidth,
                  0
                ),
                width: computedWidth,
                maxWidth:
                  layout.freeWidth === 0
                    ? layout.inputWidth
                    : layout.inputWidth + layout.freeWidth,
                maxHeight: showAbove
                  ? "auto"
                  : Math.max(layout.freeHeight - keyboardHeight - 50, 0),
              },
              menuStyle,
            ]}
          >
            <FlatList
              data={isLocation ? results : options}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedValue === item && {
                        fontWeight: "bold",
                        color: Colors.primaryBlue,
                      },
                      {
                        maxWidth:
                          (typeof computedWidth === "number"
                            ? computedWidth
                            : layout.inputWidth + layout.freeWidth) * 0.85,
                      },
                    ]}
                    onLayout={(e) => {
                      const { width } = e.nativeEvent.layout;
                      setLayout((prev) => ({
                        ...prev,
                        widestTextWidth: Math.max(prev.widestTextWidth, width),
                      }));
                    }}
                  >
                    {isLocation ? item.address : item}
                  </Text>
                  {selectedValue === item && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color={Colors.primaryBlue}
                    />
                  )}
                </Pressable>
              )}
              style={{ flexGrow: 0 }}
              contentContainerStyle={{ paddingVertical: 4 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Portal>
      )}

      {/* Invisible measurement text for width */}
      <View style={styles.longText}>
        {options?.map((option, index) => (
          <Text
            key={`${option}-${index}`}
            style={styles.dropdownText}
            onLayout={(e) => {
              const { width } = e.nativeEvent.layout;
              setLayout((prev) => ({
                ...prev,
                widestTextWidth: Math.max(prev.widestTextWidth, width),
              }));
            }}
          >
            {option}
          </Text>
        ))}
      </View>
    </View>
  );
};
