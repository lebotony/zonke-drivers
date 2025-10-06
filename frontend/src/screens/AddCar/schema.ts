import { z } from 'zod';

export const fieldValidators = {
  type: z.string(),
  brand: z.string(),
  manual: z.boolean(),
  diesel: z.boolean(),
  model: z.string().min(4, 'Model must be at least 1 character'),
  mileage: z.coerce.number().int().min(1, 'Mileage must be at least 1 digit'),
  engine_capacity: z.coerce.number().min(1, 'Mileage must be at least 1 digit'),
  passengers: z.coerce.number().int().min(1, 'Passengers count must be at least 1 digit'),
};

export const FormSchema = z.object({
  type: fieldValidators.type,
  brand: fieldValidators.brand,
  manual: fieldValidators.manual,
  diesel: fieldValidators.diesel,
  model: fieldValidators.model,
  mileage: fieldValidators.mileage,
  engine_capacity: fieldValidators.engine_capacity,
  passengers: fieldValidators.passengers,
});
