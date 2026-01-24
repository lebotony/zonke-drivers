import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";

export const PLATFORM_FILTERS = [
  // 🚗 Vehicle Types
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

  // 🌍 Global Ride-Hailing Platforms
  { value: "uber", slug: "Uber", bgColor: Colors.black, color: Colors.white },
  { value: "lyft", slug: "Lyft", bgColor: Colors.lyftPink, color: Colors.white },
  { value: "bolt", slug: "Bolt", bgColor: Colors.boltGreen, color: Colors.white },
  { value: "didi", slug: "DiDi", bgColor: Colors.didiOrange, color: Colors.white },
  { value: "grab", slug: "Grab", bgColor: Colors.grabGreen, color: Colors.white },
  { value: "gojek", slug: "Gojek", bgColor: Colors.gojekGreen, color: Colors.white },
  { value: "ola", slug: "Ola", bgColor: Colors.olaGreen, color: Colors.black },
  { value: "careem", slug: "Careem", bgColor: Colors.careemGreen, color: Colors.white },
  { value: "indriver", slug: "inDriver", bgColor: Colors.inDriverBlue, color: Colors.white },

  // 🍔 Food Delivery Platforms
  { value: "uber_eats", slug: "Uber Eats", bgColor: Colors.uberEatsGreen, color: Colors.white },
  { value: "doordash", slug: "DoorDash", bgColor: Colors.doordashRed, color: Colors.white },
  { value: "grubhub", slug: "Grubhub", bgColor: Colors.grubhubOrange, color: Colors.white },
  { value: "deliveroo", slug: "Deliveroo", bgColor: Colors.deliverooTeal, color: Colors.white },
  { value: "glovo", slug: "Glovo", bgColor: Colors.glovoYellow, color: Colors.black },
  { value: "rappi", slug: "Rappi", bgColor: Colors.rappiOrange, color: Colors.white },
  { value: "zomato", slug: "Zomato", bgColor: Colors.zomatoRed, color: Colors.white },
  { value: "swiggy", slug: "Swiggy", bgColor: Colors.swiggyOrange, color: Colors.white },
  { value: "postmates", slug: "Postmates", bgColor: Colors.postmatesBlack, color: Colors.white },
  { value: "mr_d_food", slug: "Mr D Food", color: Colors.bg, bgColor: Colors.mrDBlue },

  // 🛒 Grocery & Package Delivery
  { value: "checkers", slug: "CheckersSixty60", color: Colors.white, bgColor: Colors.checkers60Green },
  { value: "instacart", slug: "Instacart", bgColor: Colors.instacartGreen, color: Colors.white },
];

export const PLATFORM_LABELS = PLATFORM_FILTERS.map(
  (platform) => platform.value,
);

export const LICENCES = [
  // 🚗 Light Motor Vehicles
  { slug: "lmv", name: "Light Motor Vehicle (LMV)" },
  { slug: "class_b", name: "Class B / Code B (Passenger Car)" },
  { slug: "class_be", name: "Class BE (Car + Trailer)" },

  // 🏍️ Motorcycles
  { slug: "a1", name: "Motorcycle (Up to 125cc / A1)" },
  { slug: "a2", name: "Motorcycle (Restricted / A2)" },
  { slug: "a", name: "Motorcycle (Unlimited / A)" },
  { slug: "m", name: "Motorcycle (General)" },

  // 🚐 Minibus / Vans
  { slug: "class_c1", name: "C1 (Light Truck / Van)" },
  { slug: "class_d1", name: "D1 (Minibus)" },

  // 🚌 Passenger Transport
  { slug: "class_d", name: "D (Bus / Passenger Vehicle)" },
  { slug: "psv", name: "Public Service Vehicle (PSV)" },

  // 🚚 Heavy Goods Vehicles
  { slug: "class_c", name: "C (Heavy Goods Vehicle)" },
  { slug: "class_ce", name: "CE (Truck + Trailer)" },
  { slug: "class_ec", name: "EC (Extra Heavy Combination)" },

  // 🚛 Commercial / Freight
  { slug: "code_c1", name: "Code C1 (Light Commercial Truck)" },
  { slug: "code_c", name: "Code C (Commercial Truck)" },
  { slug: "code_ec1", name: "Code EC1 (Truck + Small Trailer)" },

  // 🚜 Agricultural / Industria
  { slug: "tractor", name: "Agricultural Tractor" },
  { slug: "forklift", name: "Forklift / Industrial Vehicle" },

  // 🚖 Special / Professional
  { slug: "taxi", name: "Taxi / Ride-Hailing Licence" },
  { slug: "chauffeur", name: "Chauffeur / Professional Driver" },
  { slug: "hazmat", name: "Hazardous Materials (HazMat)" },

  // 🚑 Emergency & Government
  { slug: "emergency", name: "Emergency Vehicle" },
  { slug: "government", name: "Government / Official Vehicle" },

  // 🧪 Learner / Provisional
  { slug: "learner", name: "Learner / Provisional Licence" },
  { slug: "restricted", name: "Restricted Licence" },

  // 🌍 Generic / Other
  { slug: "international", name: "International Driving Permit (IDP)" },
];
