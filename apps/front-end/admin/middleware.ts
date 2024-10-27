// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";
// import decode from "jwt-decode";
// import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
//
// const loginUrl = "/auth/login";
//
// const PUBLIC_FILE = /\.(.*)$/;
//
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextApiRequest) {
//   const { pathname } = new URL(request.url);
//
//   if (
//     pathname.startsWith("/_next") || // exclude Next.js internals
//     pathname.startsWith("/api") || //  exclude all API routes
//     pathname.startsWith("/static") || // exclude static files
//     PUBLIC_FILE.test(pathname) // exclude all files in the public folder
//   )
//     return NextResponse.next();
//
//   const jwt = (request.cookies as unknown as RequestCookies).get("jwt")?.value;
//
//   const url = new URL(request.url);
//
//   if (url.pathname !== loginUrl) {
//     const isValid = isValidJWTCookie(jwt);
//
//     if (!isValid) {
//       return NextResponse.redirect(new URL(loginUrl, url));
//     }
//   }
// }
//
// const isValidJWTCookie = (jwtCookie: string) => {
//   if (typeof jwtCookie !== "string") return false;
//   const isBearer = jwtCookie.startsWith("Bearer");
//   const jwt = isBearer ? jwtCookie.split("Bearer ")[1] : jwtCookie;
//   try {
//     const { exp } = decode<{ exp: number }>(jwt);
//     return Date.now() < exp * 1000;
//   } catch (error) {
//     return false;
//   }
// };
//
// export const config = {
//   //   ((?!api|_next/static|_next/image|favicon.ico).*)
// };
