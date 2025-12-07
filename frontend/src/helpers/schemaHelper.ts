import { isEmpty } from "lodash";
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

export const stringsZodValidation = (fieldName?: string) => {
  const isOptional = isEmpty(fieldName)
  const base = z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => isOptional || val.length > 0,
      {
        message: `${fieldName} must contain at least one character`,
      }
    );

  return isOptional ? base.optional() : base;
};