import { z } from "zod";

const emailSchema = z
   .email("Enter a valid email address.")
  .trim()
  .min(1, "Email is required.")

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be no more than 128 characters.")
  .regex(/[a-z]/, "Password must include a lowercase letter.")
  .regex(/[A-Z]/, "Password must include an uppercase letter.")
  .regex(/[0-9]/, "Password must include a number.");


// Keep codes as strings to preserve leading zeros. Assumes six-digit codes.
const codeSchema = z
  .string()
  .trim()
  .min(1, "Verification code is required.")
  .regex(/^\d{6}$/, "Enter a 6-digit verification code.");


export const loginSchema = z.object({
  email: emailSchema,
  // Sign-in accepts existing passwords without enforcing new-password rules.
  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password must be no more than 128 characters."),
});


export const signupStepOneSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


export const signupStepTwoSchema = z.object({
  code: codeSchema,
});


export const forgotPasswordStepOneSchema = z.object({
  email: emailSchema,
});


export const forgotPasswordStepTwoSchema = z.object({
  code: codeSchema,
});


export const forgotPasswordStepThreeSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


export type LoginValues = z.infer<typeof loginSchema>;
export type SignupStepOneValues = z.infer<typeof signupStepOneSchema>;
export type SignupStepTwoValues = z.infer<typeof signupStepTwoSchema>;
export type ForgotPasswordStepOneValues = z.infer<typeof forgotPasswordStepOneSchema>;
export type ForgotPasswordStepTwoValues = z.infer<typeof forgotPasswordStepTwoSchema>;
export type ForgotPasswordStepThreeValues = z.infer<typeof forgotPasswordStepThreeSchema>;
