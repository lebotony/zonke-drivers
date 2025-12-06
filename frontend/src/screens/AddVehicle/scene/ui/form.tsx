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
    label: "Rent per week",
    icon: "monetization-on",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "payments_per_month",
    placeholder: "4",
    label: "No. of Payments per month",
    icon: "monetization-on",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "model",
    placeholder: "Corolla",
    label: "Car Model",
    icon: "directions-car",
    iconSize: 22,
  },
  {
    name: "mileage",
    placeholder: "10 000",
    label: "Car Mileage (km)",
    icon: "place",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "engine_capacity",
    placeholder: "1.5",
    label: "Engine Capacity",
    icon: "local-gas-station",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "passengers",
    placeholder: "3",
    label: "Passengers",
    icon: "people",
    iconSize: 22,
    decimalPad: true,
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
          decimalPad={item.decimalPad}
        />
      ))}
    </View>
  );
};
