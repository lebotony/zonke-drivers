import { View } from "react-native";
import { Control, FieldErrors } from "react-hook-form";

import { Fieldset } from "@/src/components/form/fieldset/input";

import { AddVehicleFormValues } from "./addVehicle";
import { styles } from "../styles/form";

type AddVehicleFormProps = {
  control: Control<AddVehicleFormValues, any, AddVehicleFormValues>;
  errors: FieldErrors<AddVehicleFormValues>;
};

const addFormDef = [
  {
    name: "price_fixed",
    placeholder: "36",
    label: "Price per day",
    icon: "monetization-on",
    iconSize: 22,
    required: true,
  },
  {
    name: "model",
    placeholder: "Corolla",
    label: "Car Model",
    icon: "directions-car",
    iconSize: 22,
    required: true,
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
    name: "passengers",
    placeholder: "3",
    label: "Passengers",
    icon: "people",
    iconSize: 22,
  },
];

export const AddVehicleForm = (props: AddVehicleFormProps) => {
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
          required={item.required}
        />
      ))}
    </View>
  );
};
