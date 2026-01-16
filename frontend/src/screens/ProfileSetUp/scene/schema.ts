import {
  numbersZodValidation,
  stringsZodValidation,
} from "@/src/helpers/schemaHelper";
import { z } from "zod";

export const fieldValidators = {
  first_name: stringsZodValidation("First Name"),
  last_name: stringsZodValidation("Last Name"),
  location: z
    .object({
      lon: z.number().optional(),
      lat: z.number().optional(),
      country: z.string().optional(),
      city: z.string().optional(),
      place: z.string().optional(),
    })
    .optional(),
  email: stringsZodValidation(),
  dob: stringsZodValidation(),
  description: stringsZodValidation(),
  platforms: z.string().array().optional(),
  licences: z.string().array().optional(),
  experience: numbersZodValidation("Experience"),
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
  experience: fieldValidators.experience,
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
