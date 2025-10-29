import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@/constants/ui";
import { useAuth } from "@/src/authContext";

import { styles } from "../styles/settingsItems";

type SettingsItemsProps = {
  settings: Record<string, any>[];
};

export const SettingsItems = (props: SettingsItemsProps) => {
  const { settings } = props;
  const { onLogout } = useAuth();

  return (
    <View style={styles.container}>
      {settings.map((item: Record<string, any>, index: number) => {
        const isLogoutItem = item.slug === "logout";
        const isPreviewCard = item.slug === "card";

        const handleOnPress = () => {
          if (isLogoutItem) {
            return onLogout!();
          }
          if (isPreviewCard) {
            return router.push("/previewCard");
          }
        };

        return (
          <View key={`${item.label}-${index}`} style={styles.settingsItem}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: item.iconWrapperColor },
              ]}
            >
              {item.icon}
            </View>
            <TouchableOpacity
              onPress={handleOnPress}
              style={[
                styles.itemLabelWrapper,
                index !== settings.length - 1 && {
                  borderBottomColor: "#F2F2F2",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.itemLabelText,
                  isLogoutItem && { color: Colors.lightRed },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              style={styles.forwardArrow}
            />
          </View>
        );
      })}
    </View>
  );
};
