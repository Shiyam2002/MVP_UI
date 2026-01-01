// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Named export "proxy" (required) — Next.js runs this for matching requests.
 * You may also export a default function instead (export default function ...).
 */
export function proxy(req: NextRequest) {
    try {
        const url = req.nextUrl.clone();
        const pathname = url.pathname;

        // PUBLIC routes that don't require auth
        const publicPaths = [
            "/",
            "/login",
            "/signup",
            "/forgot-password",
            "/_next/",      // Next internals
            "/favicon.ico",
            "/api/public",  // example public API
        ];

        // Quick allowlist: allow static/next internals and explicit public paths
        if (
            pathname.startsWith("/_next/") ||
            pathname.startsWith("/static/") ||
            publicPaths.some((p) => pathname === p || pathname.startsWith(p))
        ) {
            return NextResponse.next();
        }

        // read cookie named "token" (httpOnly or regular)
        const token = req.cookies.get("token")?.value;

        // protected route example set (you can use matcher config instead)
        const protectedPrefixes = ["/dashboard", "/documents", "/workspace", "/settings"];

        // If request is to a protected route and there's no token -> redirect to /login
        if (!token && protectedPrefixes.some((p) => pathname.startsWith(p))) {
            const loginUrl = new URL("/login", req.url);
            // optionally attach redirect back-to param
            loginUrl.searchParams.set("next", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // If token exists but you want to guard against invalid token you could call an auth check here
        // (be mindful of performance — proxy runs on every matching request)

        return NextResponse.next();
    } catch (err) {
        // in case of any runtime error, allow Next.js to handle the request but log if needed
        // (throwing will cause 500)
        console.error("Proxy error:", err);
        return NextResponse.next();
    }
}

/**
 * scope the proxy only to paths you care about.
 * adjust the matcher list to match your app routes.
 */
export const config = {
    matcher: [
        /*
          This matcher pattern will apply the proxy to:
          /dashboard, /dashboard/*, /documents, /documents/*, etc.
        */
        "/dashboard/:path*",
        "/documents/:path*",
        "/workspace/:path*",
        "/settings/:path*",
    ],
};
