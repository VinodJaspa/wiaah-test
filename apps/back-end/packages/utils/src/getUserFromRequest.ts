import { mockedUser } from "./test";
import { AuthorizationDecodedUser } from "./types";
import { ObjectId } from "mongodb";
import { parseCookies } from "./CookiesParser";
import * as jwt from "jsonwebtoken";
import { parse } from "cookie";

export function getUserFromRequest<T = AuthorizationDecodedUser>(
  req: any,
  mock: boolean = false,
  _mockedUser?: AuthorizationDecodedUser
): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;

  if (mock && !user)
    return _mockedUser
      ? _mockedUser
      : ({ ...mockedUser, id: new ObjectId().toHexString() } as any);
  return user;
}

export function VerifyAndGetUserFromContext(
  ctx: any
): (AuthorizationDecodedUser & { token: string }) | null {
  if (typeof ctx["req"] !== "undefined") {
    if (ctx?.req?.headers && ctx?.req?.headers["cookie"]) {
      const rawCookies = ctx.req.headers["cookie"];
      const parsedCookies = parse(rawCookies);
      const cookiesKey = process.env.COOKIES_KEY || "jwt";
      const jwtSecret = process.env.JWT_SERCERT || "secret";
      if (typeof cookiesKey === "string") {
        const authToken = parsedCookies[cookiesKey];
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
  return null;
}
