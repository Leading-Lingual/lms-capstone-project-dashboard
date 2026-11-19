import type { UserRole } from "@/types/auth.types";
export interface UpdateProfileRequest { name: string }
export interface UpdateUserRequest { role?: UserRole; isActive?: boolean }
export interface AuditLog {
  id: string; actorId: string | null; action: string; resourceId: string;
  requestId: string; metadata: Record<string, unknown> | null; createdAt: string;
}
