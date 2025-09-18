import { z } from 'zod';

export const fieldValidators = {
  full_name: z.string(),
  business_name: z.string(),
  location: z.string(),
  bio: z.string(),
};

export const SetUpOneSchema = z.object({
  full_name: fieldValidators.full_name,
  business_name: fieldValidators.business_name,
  location: fieldValidators.location,
  bio: fieldValidators.bio,
});
