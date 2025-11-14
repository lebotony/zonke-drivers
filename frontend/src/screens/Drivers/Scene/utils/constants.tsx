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
  (platform) => platform.slug,
);

export const LICENCES = [
  { slug: "class_1", name: "Class 1" },
  { slug: "class_2", name: "Class 2" },
  { slug: "class_3", name: "Class 3" },
  { slug: "class_4", name: "Class 4" },
  { slug: "class_5", name: "Class 5" },
  { slug: "psv", name: "Public Service Vehicle" },
  { slug: "code_A1", name: "Code A1" },
  { slug: "code_A", name: "Code A" },
  { slug: "code_B", name: "Code B" },
  { slug: "code_EB", name: "Code EB" },
  { slug: "code_C1", name: "Code C1" },
  { slug: "code_C", name: "Code C" },
  { slug: "code_EC1", name: "Code EC1" },
  { slug: "code_EC", name: "Code EC" },
];
