import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be of at least 2 characters")
  .max(20, "Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special Character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
