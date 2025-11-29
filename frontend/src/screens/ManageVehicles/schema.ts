import { numbersZodValidation } from "@/src/helpers/schemaHelper";
import { z } from "zod";

export const fieldValidators = {
  amount: numbersZodValidation("Amount"),
};

export const AmountSchema = z.object({
  amount: fieldValidators.amount,
});
