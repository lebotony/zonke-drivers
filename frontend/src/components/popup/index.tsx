import React, { useEffect, useRef, useState } from "react";
import {
  View,
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
} from "react-native";
import { Feather, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Portal, Text } from "react-native-paper";

import { Colors } from "../../../constants/ui";
import { styles } from "./styles";



type PopupMenuProps = {
  label?: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  menuWidth?: "auto" | number;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  icon?: React.ComponentProps<any>["name"],
  iconColor?: string,
  iconLibrary?: 'Feather' | 'MaterialIcons' | 'AntDesign',
  children?: React.ReactNode;
  before?: boolean;
};

export const PopupMenu = ({
  label,
  options,
  selectedValue,
  onSelect,
  icon,
  iconColor = Colors.black,
  menuWidth = "auto",
  style,
  iconSize = 24,
  iconLibrary = 'Feather',
  children,
  before = false
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
    freeHeight: 0,
    freeWidth: 0,
    widestTextWidth: 0,
    iconWidth: 0,
  });

  const popupBtnRef = useRef<View>(null);
  const popupMenuRef = useRef<View>(null);
  const iconRef = useRef<View>(null);

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
            freeHeight: screenHeight - (pageY + height),
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

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
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

const leftPosition = Math.max(layout.popupLeft + layout.width - computedWidth,0);

  const showAbove = layout.freeHeight <= 225;
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
      <Pressable
        ref={popupBtnRef}
        style={[styles.container, style]}
        onPress={() => {
          if (!open) openDropdown();
          else setOpen(false);
        }}
        onLayout={() => {
          if (open) measureInputPosition();
        }}
      >{before && children}
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
      </Pressable>

      {open && (
        <Portal>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
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
                  ? "auto"
                  : Math.max(layout.freeHeight - keyboardHeight - 50, 0),
                maxWidth: screenWidth,
                marginVertical: showAbove ? -4 : 4
              },
            ]}
          >
            {label && <Text style={styles.label}>{label}</Text>}
            <FlatList
              data={options}
              keyExtractor={(item, index) => `${item}-${index}`}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.popupItem}
                  onPress={() => handleSelect(item)}
                >
                
                  <View style={[styles.dot, selectedValue !== item && {opacity: 0}]}>
                    
                  </View>
                  <Text
                    style={[
                      styles.popupText,
                      selectedValue === item && {
                        fontWeight: "bold",
                        color: Colors.primaryBlue,
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
                          width
                        ),
                      }));
                    }}
                  >
                    {item}
                  </Text>
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
        {options.map((option, index) => (
          <Text
            key={`${option}-${index}`}
            style={styles.popupText}
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
