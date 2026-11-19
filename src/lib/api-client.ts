import type { ApiErrorBody } from "@/types/api.types";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.endsWith("/api/v1")
    ? configuredApiUrl
    : `${configuredApiUrl}/api/v1`
  : undefined;

export class ApiRequestError extends Error {
  status: number;
  code?: string;
  fields?: ApiErrorBody["error"]["fields"];
  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = body?.error?.code;
    this.fields = body?.error?.fields;
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const isNextApiRoute = path.startsWith("/api/");
  const isAuthRequest = [
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/auth/resend-verification",
    "/auth/forgot-password",
    "/auth/reset-password",
  ].some((authPath) => path.split("?")[0] === authPath);

  if (!isNextApiRoute && !API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const url = isNextApiRoute
    ? path
    : isAuthRequest
      ? `${API_BASE_URL}${path}`
      : `/api/backend${path}`;
  const response = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
  const body = (await response.json().catch(() => null)) as
    | { data?: T; message?: string }
    | ApiErrorBody
    | T
    | null;
  const bodyRecord =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : undefined;

  if (!response.ok) {
    const errorBody = body as ApiErrorBody | null;
    throw new ApiRequestError(
      (bodyRecord && "error" in bodyRecord
        ? (bodyRecord.error as ApiErrorBody["error"] | undefined)?.message
        : bodyRecord && typeof bodyRecord.message === "string"
          ? bodyRecord.message
          : undefined) ?? `Request failed (${response.status}).`,
      response.status,
      errorBody ?? undefined,
    );
  }

  if (body === null) {
    throw new ApiRequestError(
      `The server returned an empty response (${response.status}).`,
      response.status,
    );
  }

  if (bodyRecord && "data" in bodyRecord) {
    return bodyRecord.data as T;
  }

  return body as T;
}

export function withPagination(
  path: string,
  params: { page?: number; limit?: number } = {},
) {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
}
