import { getCookieValue } from "@/lib/utils";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function POST(request: Request) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined");
    }

    const body = await request.json();
    const endpoint = "/api/v1/auth/login";
    const origin = request.headers.get("origin") ?? new URL(request.url).origin;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify(body),
    });

    const backendCookies = response.headers.getSetCookie();

    const lmsSessionCookie = backendCookies.find((cookie) =>
      cookie.startsWith("lms_session="),
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Authentication failed",
          errors: data.errors,
        },
        {
          status: response.status,
        },
      );
    }

    const lmsSession = getCookieValue(lmsSessionCookie);

    const nextResponse = NextResponse.json({
      ...data,
      message: data.message ? data.message : "Login successful",
    });

    // Refresh token — 7 days
    if (lmsSession) {
      nextResponse.cookies.set({
        name: "lms_session",
        value: lmsSession,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("AUTH ROUTE ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
