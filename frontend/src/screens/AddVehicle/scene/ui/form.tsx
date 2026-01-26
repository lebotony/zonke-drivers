import { View } from "react-native";
import { Control, FieldErrors } from "react-hook-form";

import { Fieldset } from "@/src/components/form/fieldset/input";

import { AddVehicleFormValues } from "./addVehicle";
import { styles } from "../styles/form";

type AddVehicleFormProps = {
  control: Control<AddVehicleFormValues, any, AddVehicleFormValues>;
  errors: FieldErrors<AddVehicleFormValues>;
  isForSale: boolean;
};

const rentFormDef = [
  {
    name: "price_fixed" as const,
    placeholder: "36",
    label: "Rent per week",
    icon: "monetization-on",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "payments_per_month" as const,
    placeholder: "4",
    label: "No. of Payments per month",
    icon: "monetization-on",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "model" as const,
    placeholder: "Corolla",
    label: "Car Model",
    icon: "directions-car",
    iconSize: 22,
  },
  {
    name: "mileage" as const,
    placeholder: "10 000",
    label: "Car Mileage (km)",
    icon: "place",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "engine_capacity" as const,
    placeholder: "1.5",
    label: "Engine Capacity",
    icon: "local-gas-station",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "passengers" as const,
    placeholder: "3",
    label: "Passengers",
    icon: "people",
    iconSize: 22,
    decimalPad: true,
  },
];

const saleFormDef = [
  {
    name: "sale_price" as const,
    placeholder: "15000",
    label: "Vehicle Price",
    icon: "monetization-on",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "model" as const,
    placeholder: "Corolla",
    label: "Car Model",
    icon: "directions-car",
    iconSize: 22,
  },
  {
    name: "mileage" as const,
    placeholder: "10 000",
    label: "Car Mileage (km)",
    icon: "place",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "engine_capacity" as const,
    placeholder: "1.5",
    label: "Engine Capacity",
    icon: "local-gas-station",
    iconSize: 22,
    decimalPad: true,
  },
  {
    name: "passengers" as const,
    placeholder: "3",
    label: "Passengers",
    icon: "people",
    iconSize: 22,
    decimalPad: true,
  },
];

export const AddVehicleForm = (props: AddVehicleFormProps) => {
  const { control, errors, isForSale } = props;
  const formDef = isForSale ? saleFormDef : rentFormDef;

  return (
    <View style={styles.container}>
      {formDef.map((item, index) => (
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
          decimalPad={item.decimalPad}
        />
      ))}
    </View>
  );
};
