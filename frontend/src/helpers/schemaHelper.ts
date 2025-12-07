import { z } from "zod";

export const numbersZodValidation = (value: string) =>
  z
    .string()
    .optional()
    .transform((val) => val?.trim() ?? "")
    .refine(
      (val) =>
        val === "" ||
        /^\d+(?:\.\d+)?$/.test(val),
      { message: `${value} must contain numbers only` }
    )

export const stringsZodValidation = () =>
  z
    .string()
    .optional()
    .transform((val) => val?.trim() ?? "")