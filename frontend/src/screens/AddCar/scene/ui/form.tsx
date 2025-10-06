import { View } from "react-native";
import { Control, FieldErrors } from "react-hook-form";

import { Fieldset } from "@/src/components/form/fieldset/input";

import { AddCarFormValues } from "./addCar";
import { styles } from "../styles/form";

type AddCarFormProps = {
  control: Control<AddCarFormValues, any, AddCarFormValues>;
  errors: FieldErrors<AddCarFormValues>;
};

const addFormDef = [
  {
    name: "model",
    placeholder: "AMG C-Class",
    label: "Car Model",
    icon: "directions-car",
    iconSize: 22,
  },
  {
    name: "mileage",
    placeholder: "10 000km",
    label: "Car Mileage",
    icon: "place",
    iconSize: 22,
  },
  {
    name: "engine_capacity",
    placeholder: "1.5",
    label: "Engine Capacity",
    icon: "local-gas-station",
    iconSize: 22,
  },
  {
    name: "passenger",
    placeholder: "3",
    label: "Passengers",
    icon: "people",
    iconSize: 22,
  },
];

export const AddCarForm = (props: AddCarFormProps) => {
  const { control, errors } = props;

  return (
    <View style={styles.container}>
      {addFormDef.map((item, index) => (
        <Fieldset
          key={`${index}-${item.name}`}
          control={control}
          name={item.name}
          label={item.label}
          inputIcon={item.icon}
          placeholder={item.placeholder}
          inputIconSize={item.iconSize}
          errors={errors}
          customStyles={{ flex: 1 }}
        />
      ))}
    </View>
  );
};
