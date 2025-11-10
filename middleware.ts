import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next";

// Initialize Arcjet security
// Note: Set ARCJET_KEY environment variable in production
const aj = arcjet({
  key: process.env.ARCJET_KEY || "test",
  characteristics: ['ip'], // Track IP by default
  rules: [
    // Rate limiting: 100 requests per minute per user
    tokenBucket({
      mode: process.env.NODE_ENV === 'production' ? "LIVE" : "DRY_RUN",
      characteristics: ["ip"],
      refillRate: 100,
      interval: 60,
      capacity: 100,
    }),
    // Bot detection
    detectBot({
      mode: process.env.NODE_ENV === 'production' ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Allow search engine bots
    }),
    // Shield: Protection against common attacks including SQL injection
    shield({
      mode: process.env.NODE_ENV === 'production' ? "LIVE" : "DRY_RUN",
    }),
  ],
});

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)", 
  "/api/public(.*)",
  "/mcp-security", // Make security docs public
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Apply Arcjet security checks
  const decision = await aj.protect(req);
  
  // Log security events
  if (decision.isDenied()) {
    console.log(`[Security] Request blocked:`, {
      reason: decision.reason,
      ip: req.ip || req.headers.get("x-forwarded-for"),
      path: req.nextUrl.pathname,
      timestamp: new Date().toISOString()
    });
    
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { 
          error: "Rate Limit Exceeded", 
          message: "Too many requests. Please try again later.",
          retryAfter: decision.reason.resetTime 
        },
        { status: 429 }
      );
    }
    
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot Detected", message: "Automated requests not allowed" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: "Request Blocked", message: "Security policy violation" },
      { status: 403 }
    );
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin routes - check for admin role
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();
    
    if (!userId) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if user has admin role in publicMetadata
    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const role = publicMetadata?.role || 'viewer';
    
    if (role !== "admin") {
      // Redirect non-admin users to portfolio
      return NextResponse.redirect(new URL("/portfolio", req.url));
    }
  }

  // For other protected routes (like /portfolio), just require authentication
  const { userId } = await auth();
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Protect /portfolio route - require authentication
  if (req.nextUrl.pathname.startsWith("/portfolio")) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)",
    "/api/(.*)"
  ],
};
