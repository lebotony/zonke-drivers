import React, { useEffect, useRef, useState } from "react";
import {
  View,
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
  TouchableOpacity,
} from "react-native";
import { Portal, Text } from "react-native-paper";

import {
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import { capitalizeFirstLetter } from "@/src/utils";

import { Colors } from "../../../constants/ui";
import { styles } from "./styles";

type OptionType = string | { label: string; value: string };

type PopupMenuProps = {
  label?: string;
  options: OptionType[];
  selectedValue?: string | null;
  onSelect: (value: string) => void;
  innerBtnFn?: () => void;
  menuWidth?: "auto" | number;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  icon?: React.ComponentProps<any>["name"];
  iconColor?: string;
  iconLibrary?: "Feather" | "MaterialIcons" | "AntDesign";
  children?: React.ReactNode;
  before?: boolean;
};

export const PopupMenu = ({
  label,
  options,
  selectedValue,
  onSelect,
  innerBtnFn,
  icon,
  iconColor = Colors.black,
  menuWidth = "auto",
  style,
  iconSize = 24,
  iconLibrary = "Feather",
  children,
  before = false,
}: PopupMenuProps) => {
  const [open, setOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [layout, setLayout] = useState({
    popupTop: 0,
    popupLeft: 0,
    width: 0,
    poupBtnWidth: 0,
    popupBtnHeight: 0,
    popupMenuWidth: 0,
    popupMenuHeight: 0,
    freeHeightBelow: 0,
    freeHeightAbove: 0,
    freeWidth: 0,
    widestTextWidth: 0,
    iconWidth: 0,
  });

  const popupBtnRef = useRef<View>(null);
  const popupMenuRef = useRef<View>(null);
  const iconRef = useRef<View>(null);

  const getOptionLabel = (option: OptionType): string => {
    return typeof option === "string" ? option : option.label;
  };

  const getOptionValue = (option: OptionType): string => {
    return typeof option === "string" ? option : option.value;
  };

  const isOptionSelected = (option: OptionType): boolean => {
    return getOptionValue(option) === selectedValue;
  };

  const measureInputPosition = (cb?: () => void) => {
    if (popupBtnRef.current) {
      const handle = findNodeHandle(popupBtnRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          const screenHeight = Dimensions.get("window").height;
          const screenWidth = Dimensions.get("window").width;
          setLayout((prev) => ({
            ...prev,
            popupTop: pageY + height,
            width,
            popupLeft: pageX,
            poupBtnWidth: width,
            popupBtnHeight: height,
            freeHeightBelow: screenHeight - (pageY + height),
            freeHeightAbove: pageY - 20,
            freeWidth: Math.round(screenWidth - width || 0),
          }));

          if (cb) cb();
        });
      }
    }
  };

  const openDropdown = () => {
    measureInputPosition(() => setOpen(true));
  };

  const onPopupPress = () => {
    if (innerBtnFn !== undefined) {
      innerBtnFn();
    }

    if (!open) openDropdown();
    else setOpen(false);
  };

  const onBackdropPress = () => {
    setOpen(false);

    if (innerBtnFn !== undefined) {
      innerBtnFn();
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
      },
    );
    const kbHideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        if (open) measureInputPosition();
      },
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

      if (innerBtnFn !== undefined) {
        innerBtnFn();
      }

      Keyboard.dismiss();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => {
      subscription.remove();
    };
  }, [open]);

  const handleSelect = (option: OptionType) => {
    const value = getOptionValue(option);

    onSelect(value);
    setOpen(false);

    if (innerBtnFn !== undefined) {
      innerBtnFn();
    }
  };

  let computedWidth: number;
  switch (menuWidth) {
    case "auto":
      computedWidth = layout.widestTextWidth + 60;
      break;
    default:
      computedWidth = menuWidth;
      break;
  }

  const screenWidth = Dimensions.get("window").width;

  const leftPosition = Math.max(
    layout.popupLeft + layout.width - computedWidth,
    0,
  );

  const showAbove = layout.freeHeightBelow <= 225;
  const popupPositionTop = showAbove
    ? layout.popupTop - (layout.popupMenuHeight + layout.popupBtnHeight)
    : layout.popupTop;

  const IconLibraries = {
    Feather,
    MaterialIcons,
    FontAwesome,
    AntDesign,
  };

  const IconComponent = IconLibraries[iconLibrary] || Feather;

  return (
    <View>
      <TouchableOpacity
        ref={popupBtnRef}
        style={[styles.container, style]}
        activeOpacity={0.5}
        onPress={onPopupPress}
        onLayout={() => {
          if (open) measureInputPosition();
        }}
      >
        {icon ? (
          <>
            {before && children}
            <View
              style={styles.iconWrapper}
              ref={iconRef}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setLayout((prev) => ({
                  ...prev,
                  iconWidth: width,
                }));
              }}
            >
              <IconComponent
                name={icon}
                size={iconSize}
                color={iconColor || Colors.black}
              />
            </View>
            {!before && children}
          </>
        ) : (
          children
        )}
      </TouchableOpacity>

      {open && options && (
        <Portal>
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <View
            ref={popupMenuRef}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setLayout((prev) => ({
                ...prev,
                popupMenuWidth: width,
                popupMenuHeight: height,
              }));
            }}
            style={[
              styles.popupMenu,
              {
                top: popupPositionTop,
                left: leftPosition,
                width: computedWidth,
                maxHeight: showAbove
                  ? layout.freeHeightAbove
                  : Math.max(layout.freeHeightBelow - keyboardHeight - 50, 0),
                maxWidth: screenWidth,
                marginVertical: showAbove ? -4 : 4,
              },
            ]}
          >
            {label && <Text style={styles.label}>{label}</Text>}
            <FlatList
              data={options}
              keyExtractor={(item, index) => {
                const value = getOptionValue(item);
                return `${value}-${index}`;
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => {
                const label = getOptionLabel(item);
                const isSelected = isOptionSelected(item);

                return (
                  <TouchableOpacity
                    style={styles.popupItem}
                    onPress={() => handleSelect(item)}
                  >
                    <View
                      style={[styles.dot, !isSelected && { opacity: 0 }]}
                    ></View>
                    <Text
                      style={[
                        styles.popupText,
                        isSelected && {
                          fontWeight: "bold",
                          color: Colors.mrDBlue,
                        },
                        {
                          maxWidth:
                            (typeof computedWidth === "number"
                              ? computedWidth
                              : layout.poupBtnWidth + layout.freeWidth) * 0.85,
                        },
                      ]}
                      onLayout={(e) => {
                        const { width } = e.nativeEvent.layout;
                        setLayout((prev) => ({
                          ...prev,
                          widestTextWidth: Math.max(
                            prev.widestTextWidth,
                            width,
                          ),
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(label)}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              style={{ flexGrow: 0 }}
              contentContainerStyle={{ paddingVertical: 4 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Portal>
      )}

      {/* Invisible measurement text for width */}
      <View style={styles.longText}>
        {options?.map((option, index) => {
          const label = getOptionLabel(option);
          return (
            <Text
              key={`${label}-${index}`}
              style={styles.popupText}
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setLayout((prev) => ({
                  ...prev,
                  widestTextWidth: Math.max(prev.widestTextWidth, width),
                }));
              }}
            >
              {label}
            </Text>
          );
        })}
      </View>
    </View>
  );
};
