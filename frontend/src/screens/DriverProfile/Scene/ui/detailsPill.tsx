import { Colors } from "@/constants/ui";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

export const detailsDef = [
  {
    slug: "rating",
    label: "Rating",
    icon: <AntDesign name="star" size={26} color={Colors.yellow} />,
  },
  {
    slug: "experience",
    label: "Experience",
    icon: <Feather name="clock" size={26} color={Colors.checkers60Green} />,
  },
  {
    slug: "total_accidents",
    label: "Accidents",
    icon: <FontAwesome5 name="car-crash" size={26} color="red" />,
  },
  {
    slug: "reviews",
    label: "Comments",
    icon: <FontAwesome name="comments" size={26} color="black" />,
  },
  {
    slug: "previous_vehicles",
    label: "Previous Vehicles",
    icon: <FontAwesome5 name="car" size={26} color="black" />,
  },
];
