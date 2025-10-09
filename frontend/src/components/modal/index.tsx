import React, { ReactNode, useRef } from 'react';
import { Animated, PanResponder, Pressable, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { styles } from './styles';
import { BarLine } from './bar';

type ModalProps = {
  children?: ReactNode;
  onDismiss?: () => void;
};

export const Modal = (props: ModalProps) => {
  const { children, onDismiss } = props;

  // Animated value for Y position
  const pan = useRef(new Animated.ValueXY()).current;

  const dismissWithAnimation = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 800 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  // PanResponder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
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
    })
  ).current;

  return (
    <BlurView intensity={60} tint="dark" style={styles.container}>
      <Pressable style={styles.backdrop} onPress={dismissWithAnimation} />

      <Animated.View
        style={[styles.modalWrapper, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <BarLine />
        {children}
      </Animated.View>
    </BlurView>
  );
};
