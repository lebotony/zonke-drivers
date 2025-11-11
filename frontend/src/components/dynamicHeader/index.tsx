import { ReactNode, useCallback, useRef, useState } from "react";
import {
  Animated,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "expo-router";

import { Colors } from "@/constants/ui";

import { styles } from "./styles";

type DynamicHeaderProps = {
  header: ReactNode;
  children:
    | ReactNode
    | ((scrollProps: {
        onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
        scrollEventThrottle: number;
        contentContainerStyle: object;
      }) => ReactNode);
  headerBgColor?: string;
  scrollThreshold?: number;
};

export const DynamicHeader = ({
  header,
  children,
  headerBgColor = Colors.white,
  scrollThreshold = 2,
}: DynamicHeaderProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOffset = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

    const showHeader = useCallback(() => {
    Animated.timing(headerOffset, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    isHidden.current = false;
  }, [headerOffset]);

  const hideHeader = useCallback(() => {
    Animated.timing(headerOffset, {
      toValue: -headerHeight,
      duration: 200,
      useNativeDriver: true,
    }).start();
    isHidden.current = true;
  }, [headerHeight, headerOffset]);

  useFocusEffect(
    useCallback(() => {
      if (isHidden.current) {
        showHeader();
      }
    }, [showHeader])
  );

  const onHeaderLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height !== headerHeight) setHeaderHeight(height);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;

    if (diff < -scrollThreshold && currentY > headerHeight && isHidden.current) {
      showHeader();
    }

    if (diff > scrollThreshold && currentY > headerHeight && !isHidden.current) {
      hideHeader();
    }

    lastScrollY.current = currentY;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <Animated.View
        onLayout={onHeaderLayout}
        style={[
          styles.headerContainer,
          {
            backgroundColor: headerBgColor,
            transform: [{ translateY: headerOffset }],
          },
        ]}
      >
        {header}
      </Animated.View>

      <View style={styles.contentContainer}>
        {typeof children === "function"
          ? children({
              onScroll,
              scrollEventThrottle: 16,
              contentContainerStyle: { paddingTop: headerHeight },
            })
          : children}
      </View>
    </SafeAreaView>
  );
};
