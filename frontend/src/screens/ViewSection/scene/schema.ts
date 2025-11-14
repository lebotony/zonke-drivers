import { z } from "zod";

export const fieldValidators = {
  text: z.string().min(1, "Comment must be at least 1 character"),
};

export const CommentSchema = z.object({
  text: fieldValidators.text,
});
