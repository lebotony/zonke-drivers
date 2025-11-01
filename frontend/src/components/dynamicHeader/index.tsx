import { ReactNode, useRef, useState } from "react";
import {
  Animated,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { styles } from "./styles";
import { Colors } from "@/constants/ui";

type DynamicHeaderProps = {
  header: ReactNode;
  children: ReactNode;
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

  const onHeaderLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height !== headerHeight) setHeaderHeight(height);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;

    // If header is scrolled completely off-screen and user scrolls up slightly -> show it
    if (diff < -scrollThreshold && currentY > headerHeight && isHidden.current) {
      Animated.timing(headerOffset, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      isHidden.current = false;
    }

    // If header has been scrolled off and user scrolls down -> keep it hidden
    if (diff > scrollThreshold && currentY > headerHeight && !isHidden.current) {
      Animated.timing(headerOffset, {
        toValue: -headerHeight,
        duration: 200,
        useNativeDriver: true,
      }).start();
      isHidden.current = true;
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

      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={[styles.contentContainer, {paddingTop: headerHeight}]}
      >
          {children}
        
      </ScrollView>
    </SafeAreaView>
  );
};