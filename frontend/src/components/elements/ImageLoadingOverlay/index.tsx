import { View, StyleSheet, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "@/constants/ui";

type ImageLoadingOverlayProps = {
  isLoading: boolean;
  borderRadius?: number;
};

/**
 * Overlay component that displays a loading spinner on top of an image
 * while it's being compressed and uploaded.
 */
export const ImageLoadingOverlay = ({
  isLoading,
  borderRadius = 10
}: ImageLoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <View style={[styles.overlay, { borderRadius }]}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
