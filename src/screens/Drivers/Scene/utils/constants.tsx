import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto
} from "@expo/vector-icons";

import { Colors } from "@constants/ui";

export const PLATFORM_FILTERS = [
  {
    value: "bike",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome name="motorcycle" size={22} color="white" />
  },
  {
    value: "passenger",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <Ionicons name="car-sport-outline" size={24} color="white" />
  },
  {
    value: "taxi",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <MaterialCommunityIcons name="bus-side" size={24} color="white" />
  },
  {
    value: "truck",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <Fontisto name="truck" size={20} color="white" />
  },
  { value: "uber", slug: "Uber", bgColor: Colors.black, color: Colors.white },
  {
    value: "bolt",
    slug: "Bolt",
    bgColor: Colors.boltGreen,
    color: Colors.white
  },
  {
    value: "uber_eats",
    slug: "Uber Eats",
    bgColor: Colors.uberEatsGreen,
    color: Colors.white
  },
  {
    value: "checkers",
    slug: "CheckersSixty60",
    color: Colors.white,
    bgColor: Colors.checkers60Green
  },
  {
    value: "mr_d_food",
    slug: "Mr D Food",
    color: Colors.black,
    bgColor: Colors.mrDBlue
  }
];
