import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.endsWith("/api/v1")
    ? configuredApiUrl
    : `${configuredApiUrl}/api/v1`
  : undefined;

async function forwardRequest(
  request: NextRequest,
  context: RouteContext<"/api/backend/[...path]">,
) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL is not configured." },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const sessionToken = (await cookies()).get("lms_session")?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 },
    );
  }

  const targetUrl = new URL(`${API_BASE_URL}/${path.join("/")}`);
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  if (contentType) headers.set("Content-Type", contentType);
  if (origin) headers.set("Origin", origin);

  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
    credentials: "include",
  });

  const responseHeaders = new Headers();
  const upstreamContentType = upstreamResponse.headers.get("content-type");
  if (upstreamContentType) {
    responseHeaders.set("Content-Type", upstreamContentType);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export const GET = forwardRequest;
export const POST = forwardRequest;
export const PUT = forwardRequest;
export const PATCH = forwardRequest;
export const DELETE = forwardRequest;
