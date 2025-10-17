import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

export const PLATFORM_FILTERS = [
  {
    value: "bike",
    slug: "Bike",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="motorcycle" size={18} color="white" />,
    justIcon: true,
  },
  {
    value: "passenger",
    slug: "Passenger",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="car" size={20} color="white" />,
    justIcon: true,
  },
  {
    value: "taxi",
    slug: "Taxi",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="bus" size={17} color="white" />,
    justIcon: true,
  },
  {
    value: "truck",
    slug: "Truck",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="truck" size={16} color="white" />,
    justIcon: true,
  },
  {
    value: "lorry",
    slug: "Lorry",
    color: Colors.white,
    bgColor: Colors.mediumDarkGrey,
    icon: <FontAwesome5 name="truck-moving" size={16} color="white" />,
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

export const PLATFORM_LABELS = PLATFORM_FILTERS.map(
  (platform) => platform.slug
);

export const LICENCES = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Public Service Vehicle (PSV)",
];
