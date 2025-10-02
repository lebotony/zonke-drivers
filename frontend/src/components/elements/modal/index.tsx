import React, { ReactNode, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
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

  // PanResponder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical drags
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gesture) => {
        // If dragged down far enough, dismiss
        if (gesture.dy > 80) {
          if (onDismiss) {
            onDismiss();
          }
          // Optionally animate out
          Animated.timing(pan, {
            toValue: { x: 0, y: 800 },
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          // Snap back to original position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <BlurView intensity={60} tint="dark" style={styles.container}>
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
