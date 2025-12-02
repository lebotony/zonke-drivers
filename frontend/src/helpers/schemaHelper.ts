import { z } from "zod";

export const numbersZodValidation = (value: string) =>
  z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return String(val);
    },
    z
      .string()
      .optional()
      .refine((val) => val === undefined || /^\d+(?:\.\d+)?$/.test(val), {
        message: `${value} value must contain numbers only`,
      })
      .transform((val) => (val === undefined ? undefined : Number(val))),
  );
