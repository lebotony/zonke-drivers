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
  StyleSheet,
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

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 800 })).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Slide up animation on mount
    Animated.parallel([
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dismissWithAnimation = () => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: 0, y: 800 },
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
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
    <Animated.View style={[styles.container, { opacity: backdropOpacity }]}>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFillObject}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.7)" />

        <Pressable style={styles.backdrop} onPress={dismissWithAnimation} />
      </BlurView>

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
        <View style={{ height: 24, paddingTop: 8 }} {...panResponder.panHandlers}>
          <BarLine />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};
