import { z } from 'zod';

export const fieldValidators = {
  post: z.string(),
  location: z.string(),
  service: z.string(),
  price: z.string(),
};

export const CreatePostSchema = z.object({
  post: fieldValidators.post,
  location: fieldValidators.location,
  service: fieldValidators.service,
  price: fieldValidators.price,
});
