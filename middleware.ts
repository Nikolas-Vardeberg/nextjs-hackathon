import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const clerk = clerkMiddleware();

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // 👉 Your custom logic BEFORE Clerk
  if (req.nextUrl.pathname.startsWith("/_next/image")) {
    req.headers.set("Cache-Control", "public, max-age=604800, immutable"); //1 week
  }

  // 👉 Call Clerk middleware and return its result
  return clerk(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
