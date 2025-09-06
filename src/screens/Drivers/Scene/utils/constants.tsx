import { FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "@constants/ui";

export const PLATFORM_FILTERS = [
  {
    value: "bike",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="motorcycle" size={18} color="white" />,
    justIcon: true,
  },
  {
    value: "passenger",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="car" size={20} color="white" />,
    justIcon: true,
  },
  {
    value: "taxi",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="bus" size={17} color="white" />,
    justIcon: true,
  },
  {
    value: "truck",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="truck" size={16} color="white" />,
    justIcon: true,
  },
  { value: "uber", slug: "Uber", bgColor: Colors.black, color: Colors.white },
  {
    value: "bolt",
    slug: "Bolt",
    bgColor: Colors.boltGreen,
    color: Colors.white,
  },
  {
    value: "uber_eats",
    slug: "Uber Eats",
    bgColor: Colors.uberEatsGreen,
    color: Colors.white,
  },
  {
    value: "checkers",
    slug: "CheckersSixty60",
    color: Colors.white,
    bgColor: Colors.checkers60Green,
  },
  {
    value: "mr_d_food",
    slug: "Mr D Food",
    color: Colors.bg,
    bgColor: Colors.mrDBlue,
  },
];
