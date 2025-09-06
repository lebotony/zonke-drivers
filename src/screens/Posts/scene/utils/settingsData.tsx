import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export const settingsData = [
  {
    icon: <MaterialIcons name="language" size={20} />,
    text: 'Any one',
    checked: false,
  },
  {
    icon: <Ionicons name="people-outline" size={23} color="black" />,
    text: 'Your Followers only',
    checked: false,
    selected: true,
  },
  {
    icon: <FontAwesome5 name="user" size={17} color="black" />,
    text: 'Only one',
    checked: false,
  },
];
