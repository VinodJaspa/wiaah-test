import { mockedUser } from "./test";
import { AuthorizationDecodedUser } from "./types";
import { ObjectId } from "mongodb";
import { parseCookies } from "./CookiesParser";
import * as jwt from "jsonwebtoken";

const mockAuthorzation = true;

export function getUserFromRequest<T = AuthorizationDecodedUser>(req: any): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;

  if (mockAuthorzation && !user)
    return { ...mockedUser, id: new ObjectId().toHexString() } as any;
  return user;
}

export function VerifyAndGetUserFromContext(
  ctx: any
): AuthorizationDecodedUser & { token: string } {
  if (typeof ctx["req"] !== "undefined") {
    // @ts-ignore
    if (ctx?.req?.headers && ctx?.req?.headers["cookie"]) {
      // @ts-ignore
      const rawCookies = ctx.req.headers["cookie"];
      const parsedCookies = parseCookies(rawCookies);
      const cookiesKey = process.env.COOKIES_KEY || "Auth_cookie";
      const jwtSecret = process.env.JWT_SERCERT || "secret";
      if (typeof cookiesKey === "string") {
        const authToken = parsedCookies.find(
          (cookie) => cookie.cookieName === cookiesKey
        ).cookieValue;
        if (authToken) {
          try {
            const user = jwt.verify(authToken, jwtSecret);
            if (typeof user === "object") {
              return {
                ...user,
                token: authToken,
              } as AuthorizationDecodedUser & { token: string };
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      }
    }
  }
}
