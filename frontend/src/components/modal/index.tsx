import React, { ReactNode, useRef, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StatusBar,
  ScrollView,
  View,
  Keyboard,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";

import { Colors } from "@/constants/ui";

import { styles } from "./styles";
import { BarLine } from "./bar";

type ModalProps = {
  children?: ReactNode;
  onDismiss?: () => void;
};

export const Modal = (props: ModalProps) => {
  const { children, onDismiss } = props;

  const pan = useRef(new Animated.ValueXY()).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const dismissWithAnimation = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 800 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  // PanResponder for drag-to-dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderMove: (_, gestureState) => {
        pan.setValue({ x: 0, y: gestureState.dy });
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 80) {
          dismissWithAnimation();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <BlurView intensity={60} tint="dark" style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.grey} />

      <Pressable style={styles.backdrop} onPress={dismissWithAnimation} />

      <Animated.View
        style={[
          styles.modalWrapper,
          {
            transform: [{ translateY: pan.y }],
            ...(Platform.OS === "ios" && keyboardHeight > 0 ? { bottom: keyboardHeight } : {}),
          },
          Platform.OS === "ios" && keyboardHeight > 0 ? { maxHeight: screenHeight - keyboardHeight } : {},
        ]}
      >
        {/* draggable area */}
        <View style={{ height: 20 }} {...panResponder.panHandlers}>
          <BarLine />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </Animated.View>
    </BlurView>
  );
};
