import { z } from 'zod';

export const fieldValidators = {
  full_name: z.string(),
  location: z.string(),
  dob: z.string(),
  bio: z.string().optional(),
  platforms: z.string().array().optional(),
  licences: z.string().array().optional(),
  asset: z
    .object({
      file_path: z.string(),
      filename: z.string(),
    })
};

export const SetUpOneSchema = z.object({
  full_name: fieldValidators.full_name,
  location: fieldValidators.location,
  bio: fieldValidators.bio,
  platforms: fieldValidators.platforms,
  licences: fieldValidators.licences,
  asset: fieldValidators.asset,
  dob: fieldValidators.dob,
});
