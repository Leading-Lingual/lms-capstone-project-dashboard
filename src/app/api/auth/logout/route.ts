import { NextResponse, type NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const API_BASE_URL = API_URL
  ? API_URL.endsWith("/api/v1")
    ? API_URL
    : `${API_URL}/api/v1`
  : undefined;

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("lms_session")?.value;
  let backendLogoutSucceeded = false;

  if (sessionToken && API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionToken}`,
          Origin: request.headers.get("origin") ?? new URL(request.url).origin,
        },
        cache: "no-store",
      });

      backendLogoutSucceeded = response.ok;
    } catch {
      backendLogoutSucceeded = false;
    }
  }

  const response = NextResponse.json({
    message: "Signed out.",
    backendLogoutSucceeded,
  });

  for (const cookieName of [
    "lms_session",
    "refresh_token",
    "access_token",
    "csrf_token",
  ]) {
    response.cookies.set(cookieName, "", {
      httpOnly: cookieName !== "csrf_token",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
  }

  return response;
}
