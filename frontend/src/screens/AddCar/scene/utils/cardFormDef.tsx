import { Colors } from "@/constants/ui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const CardFormDef = [
  {
    label: "Type",
    icon: <MaterialIcons name="commute" size={22} color={Colors.tealGreen} />,
    placeholder: "Truck",
  },
  {
    label: "Brand",
    icon: (
      <Ionicons name="settings-outline" size={18} color={Colors.tealGreen} />
    ),
    placeholder: "Benz",
  },
  {
    label: "Manual",
    icon: <MaterialIcons name="build" size={20} color={Colors.tealGreen} />,
  },
  {
    label: "Diesel",
    icon: (
      <MaterialIcons
        name="local-gas-station"
        size={20}
        color={Colors.tealGreen}
      />
    ),
  },
];
