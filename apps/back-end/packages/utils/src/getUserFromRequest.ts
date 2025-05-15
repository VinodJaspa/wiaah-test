import { mockedUser } from "./test";
import { AuthorizationDecodedUser } from "./types";
import { ObjectId } from "mongodb";
import {  parseCookiesToRecord } from "./CookiesParser";
import * as jwt from "jsonwebtoken";
import cookie from 'cookie'; 

export function getUserFromRequest<T = AuthorizationDecodedUser>(
  req: any,
  mock: boolean = false,
  _mockedUser?: AuthorizationDecodedUser
): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;

  if (mock && !user)
    return _mockedUser
      ? (_mockedUser as T)
      : ({ ...mockedUser, id: new ObjectId().toHexString() } as any);
  return user;
}

export const VerifyAndGetUserFromContext = async ({ req }: { req: any }) => {
  let token: string | undefined;

  // 1. Try to get token from Authorization header
  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
console.log(req.headers.cookie ,"cokie");

  if (!token && req.headers?.cookie) {
    try {
      const cookies = cookie.parse(req.headers.cookie);
      console.log(cookies,"cookies")
      token = cookies.auth_token;
    } catch (err:any) {
      console.warn('[Gateway] Error parsing cookies:', err.message);
    }
  }

  // 3. Decode the token
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = decoded?.results?.data;
      console.log('[Gateway] User from token:', user);
      return { user };
    } catch (err:any) {
      console.warn('[Gateway] Invalid token:', err.message);
    }
  }

  console.warn('[Gateway] No valid token found');
  return { user: null };
};


