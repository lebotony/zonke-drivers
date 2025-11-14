import { z } from "zod";

export const fieldValidators = {
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  location: z
    .object({
      address: z.string().optional(),
      lon: z.number().optional(),
      lat: z.number().optional(),
    })
    .optional(),
  email: z.string().optional(),
  dob: z.string().optional(),
  description: z.string().optional(),
  platforms: z.string().array().optional(),
  licences: z.string().array().optional(),
  asset: z
    .object({
      file_path: z.string().optional(),
      filename: z.string().optional(),
    })
    .optional(),
};

export const DriverProfileSchema = z.object({
  first_name: fieldValidators.first_name,
  last_name: fieldValidators.last_name,
  email: fieldValidators.email,
  location: fieldValidators.location,
  description: fieldValidators.description,
  platforms: fieldValidators.platforms,
  licences: fieldValidators.licences,
  asset: fieldValidators.asset,
  dob: fieldValidators.dob,
});

export const OwnerProfileSchema = z.object({
  first_name: fieldValidators.first_name,
  last_name: fieldValidators.last_name,
  email: fieldValidators.email,
  location: fieldValidators.location,
  asset: fieldValidators.asset,
});
