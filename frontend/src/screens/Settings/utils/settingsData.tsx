import { Colors } from "@/constants/ui";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const settingsItemsDef = [
  {
    label: "Account",
    icon: (
      <MaterialCommunityIcons name="account" size={25} color={Colors.white} />
    ),
    iconWrapperColor: Colors.darkUiBlue,
  },
  {
    label: "Chats",
    icon: <AntDesign name="message1" color={Colors.white} size={22} />,
    iconWrapperColor: Colors.lightGreen,
  },
  {
    label: "Notifications",
    icon: <AntDesign name="bells" color={Colors.white} size={23} />,
    iconWrapperColor: Colors.lightRed,
  },
  {
    label: "Help",
    icon: <MaterialIcons name="help-outline" size={24} color={Colors.white} />,
    iconWrapperColor: Colors.checkers60Green,
  },
  {
    label: "Tell a Friend",
    icon: (
      <Ionicons name="share-social-outline" size={24} color={Colors.white} />
    ),
    iconWrapperColor: Colors.purplePink,
  },
  {
    label: "Logout",
    icon: <Ionicons name="exit-outline" size={23} color={Colors.white} />,
    iconWrapperColor: Colors.lightRed,
  },
];
