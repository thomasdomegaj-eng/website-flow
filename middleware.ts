import { NextRequest, NextResponse } from "next/server";

const REALM = "FLOWCOAT Media Studio";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

function unavailable() {
  return new NextResponse("Media Studio is not configured for production.", {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}

function decodeBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isStudioPage = pathname === "/media-studio" || pathname.startsWith("/media-studio/");
  const isMediaMutation = pathname === "/api/project-media" && !["GET", "HEAD", "OPTIONS"].includes(request.method);

  if (!isStudioPage && !isMediaMutation) return NextResponse.next();

  const password = process.env.FLOWCOAT_MEDIA_PASSWORD?.trim();
  const username = process.env.FLOWCOAT_MEDIA_USERNAME?.trim() || "flowcoat";

  // Local development stays frictionless unless a password is explicitly configured.
  if (!password && process.env.NODE_ENV !== "production") return NextResponse.next();

  // Never expose the production upload/admin surface accidentally with no password.
  if (!password) return unavailable();

  const credentials = decodeBasicAuth(request.headers.get("authorization"));
  if (credentials?.username === username && credentials.password === password) return NextResponse.next();

  return unauthorized();
}

export const config = {
  matcher: ["/media-studio/:path*", "/api/project-media"],
};
