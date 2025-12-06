import { numbersZodValidation } from "@/src/helpers/schemaHelper";
import { z } from "zod";

export const fieldValidators = {
  model: z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .optional(),
  description: z.string().optional(),
  payments_per_month: numbersZodValidation("Payments per month"),
  mileage: numbersZodValidation("Mileage"),
  type: z.string(),
  brand: z.string(),
  manual: z.boolean(),
  fuel_type: z.string(),
  engine_capacity: numbersZodValidation("Engine Capacity"),
  passengers: numbersZodValidation("Passengers"),
  price_fixed: numbersZodValidation("Rent per week"),
  asset: z
    .object({
      file_path: z.string().optional(),
      filename: z.string().optional(),
    })
    .optional(),
};

export const FormSchema = z.object({
  model: fieldValidators.model,
  description: fieldValidators.description,
  mileage: fieldValidators.mileage,
  payments_per_month: fieldValidators.payments_per_month,
  type: fieldValidators.type,
  brand: fieldValidators.brand,
  manual: fieldValidators.manual,
  fuel_type: fieldValidators.fuel_type,
  engine_capacity: fieldValidators.engine_capacity,
  passengers: fieldValidators.passengers,
  asset: fieldValidators.asset,
  price_fixed: fieldValidators.price_fixed,
});
