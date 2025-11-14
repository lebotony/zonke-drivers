import { z } from "zod";

export const fieldValidators = {
  first_name: z.string(),
  last_name: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.any(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string(),
};

export const SignUpSchema = z
  .object({
    first_name: fieldValidators.first_name,
    last_name: fieldValidators.last_name,
    username: fieldValidators.username,
    email: fieldValidators.email,
    password: fieldValidators.password,
    confirm_password: fieldValidators.confirm_password,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const SignInSchema = z.object({
  username: fieldValidators.username,
  password: fieldValidators.password,
});
