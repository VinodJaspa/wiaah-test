// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractUserfromNextjsCookies } from "utils";

const loginUrl = "/auth/login";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.url !== loginUrl) {
    const user = await extractUserfromNextjsCookies(request.cookies, true);
    if (!user) {
      return NextResponse.redirect(loginUrl);
    }
  }
}
