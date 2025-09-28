import { z } from 'zod';

export const fieldValidators = {
  content: z.string().min(1, 'Message must be at least 1 character'),
};

export const MessageSchema = z.object({
  content: fieldValidators.content,
});
