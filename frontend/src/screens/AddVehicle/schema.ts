import { number, z } from 'zod';

export const fieldValidators = {
  model: z.string().min(4, 'Model must be at least 1 character').optional(),
  description: z.string().optional(),
  mileage: z.coerce.number().int().min(1, 'Mileage must be at least 1 digit').optional(),
  type: z.string(),
  brand: z.string(),
  manual: z.boolean(),
  fuel_type: z.string(),
  engine_capacity: z.coerce.number().min(1, 'Mileage must be at least 1 digit').optional(),
  passengers: z.coerce.number().int().min(1, 'Passengers count must be at least 1 digit').optional(),
  model_year: z.string().optional(),
  price_fixed: z.string(),
  asset: z
    .object({
      file_path: z.string(),
      filename: z.string(),
    })
};

export const FormSchema = z.object({
  model: fieldValidators.model,
  description: fieldValidators.description,
  mileage: fieldValidators.mileage,
  type: fieldValidators.type,
  brand: fieldValidators.brand,
  manual: fieldValidators.manual,
  fuel_type: fieldValidators.fuel_type,
  engine_capacity: fieldValidators.engine_capacity,
  passengers: fieldValidators.passengers,
  model_year: fieldValidators.model_year,
  asset: fieldValidators.asset,
  price_fixed: fieldValidators.price_fixed,
});
