import { Colors } from "@/constants/ui";
import { BrandsList } from "@/src/screens/Vehicles/utils/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const CardFormDef = [
  {
    name: "type",
    label: "Type",
    icon: <MaterialIcons name="commute" size={22} color={Colors.tealGreen} />,
    placeholder: "Select from dropdown...",
    options: ["Bike", "Passenger", "Taxi", "Truck", "Lorry"],
  },
  {
    name: "brand",
    label: "Brand",
    icon: (
      <Ionicons name="settings-outline" size={18} color={Colors.tealGreen} />
    ),
    placeholder: "Select from dropdown...",
    options: BrandsList?.map((brand) => brand.label),
  },
  {
    name: "fuel_type",
    label: "Fuel Type",
    icon: (
      <MaterialIcons
        name="local-gas-station"
        size={20}
        color={Colors.tealGreen}
      />
    ),
    placeholder: "Select from dropdown...",
    options: ["Diesel", "Petrol", "Electric", "Hybrid", "Hydrogen"],
  },
  {
    name: "manual",
    label: "Transmission",
    icon: <MaterialIcons name="build" size={20} color={Colors.tealGreen} />,
  },
];
