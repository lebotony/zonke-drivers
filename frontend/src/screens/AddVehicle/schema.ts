import { numbersZodValidation, stringsZodValidation } from "@/src/helpers/schemaHelper";
import { z } from "zod";

export const fieldValidators = {
  model: stringsZodValidation(),
  payments_per_month: numbersZodValidation("Payments per month"),
  mileage: numbersZodValidation("Mileage"),
  type: z.string(),
  brand: z.string(),
  manual: z.boolean(),
  fuel_type: z.string(),
  engine_capacity: numbersZodValidation("Engine Capacity"),
  passengers: numbersZodValidation("Passengers"),
  price_fixed: numbersZodValidation("Rent per week"),
  sale_price: numbersZodValidation("Vehicle price"),
  asset: z
    .object({
      file_path: z.string().optional(),
      filename: z.string().optional(),
    })
    .optional(),
};

// Combined schema with all fields, conditional validation applied at runtime
export const FormSchema = z.object({
  model: fieldValidators.model,
  mileage: fieldValidators.mileage,
  payments_per_month: fieldValidators.payments_per_month.optional(),
  type: fieldValidators.type,
  brand: fieldValidators.brand,
  manual: fieldValidators.manual,
  fuel_type: fieldValidators.fuel_type,
  engine_capacity: fieldValidators.engine_capacity,
  passengers: fieldValidators.passengers,
  asset: fieldValidators.asset,
  price_fixed: fieldValidators.price_fixed.optional(),
  sale_price: fieldValidators.sale_price.optional(),
});

// Schema for vehicle rental
export const FormSchemaRent = z.object({
  model: fieldValidators.model,
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
  sale_price: z.string().optional(),
});

// Schema for vehicle sale
export const FormSchemaSale = z.object({
  model: fieldValidators.model,
  mileage: fieldValidators.mileage,
  type: fieldValidators.type,
  brand: fieldValidators.brand,
  manual: fieldValidators.manual,
  fuel_type: fieldValidators.fuel_type,
  engine_capacity: fieldValidators.engine_capacity,
  passengers: fieldValidators.passengers,
  asset: fieldValidators.asset,
  sale_price: fieldValidators.sale_price,
  payments_per_month: z.string().optional(),
  price_fixed: z.string().optional(),
});
