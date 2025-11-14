import { z } from "zod";

export const fieldValidators = {
  amount: z.coerce.number().int().min(1, "Amount must be at least 1 digit"),
};

export const AmountSchema = z.object({
  amount: fieldValidators.amount,
});
