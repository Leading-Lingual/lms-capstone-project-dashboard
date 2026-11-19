export type UserRole = "STUDENT" | "LECTURER" | "ADMIN";
export type RegistrationRole = Exclude<UserRole, "ADMIN">;
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  emailVerifiedAt: string | null;
  lecturerApprovedAt: string | null;
}
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role?: RegistrationRole;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface VerifyEmailRequest {
  email: string;
  otp: string
}
export interface EmailRequest {
  email: string;
}
export interface ResetPasswordRequest {
  token: string;
  password: string;
}
export interface MessageData {
  message: string;
}
export interface LoginData {
  user: SafeUser;
}
