import { z } from "zod";

const emailSchema = z
   .email("Enter a valid email address.")
  .trim()
  .min(1, "Email is required.")

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters.")
  .max(128, "Password must be no more than 128 characters.");


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
    name: z.string().trim().min(2,"Name is required").max(100, "Name must be no more than 100 characters."),
    role: z.enum(["STUDENT", "LECTURER"], "Select a valid role.")
  })

export const signupStepTwoSchema = z.object({
  email: emailSchema,
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a 6-digit verification code."),
});


export const forgotPasswordStepOneSchema = z.object({
  email: emailSchema,
});

export const forgotPasswordStepThreeSchema = z
  .object({
    token:  z.string().min(1, "token is required"),
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
export type ForgotPasswordStepThreeValues = z.infer<typeof forgotPasswordStepThreeSchema>;
