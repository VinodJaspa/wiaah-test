import { mockedUser } from "./test";
import { AuthorizationDecodedUser } from "./types";
import { ObjectId } from "mongodb";
import {  parseCookiesToRecord } from "./CookiesParser";
import * as jwt from "jsonwebtoken";
import * as cookie from 'cookie';


export function getUserFromRequest<T = AuthorizationDecodedUser>(
  req: any,
  mock: boolean = false,
  _mockedUser?: AuthorizationDecodedUser
): T | null {
  let user: T | null = null;

  try {
    const userHeader = req?.headers?.user;

    if (typeof userHeader === 'string') {
      user = JSON.parse(userHeader);
    } else if (typeof userHeader === 'object' && userHeader !== null) {
      // Already parsed by some middleware or proxy (like in dev mode)
      user = userHeader as T;
    }
  } catch (err) {
    console.error('Failed to parse user header:', err);
  }

  // if (mock && !user) {
  //   return (_mockedUser as T) || ({ ...mockedUser, id: new ObjectId().toHexString() } as T);
  // }

  return user;
}


export async function VerifyAndGetUserFromContext(ctx: any) {
  const cookies = ctx.req?.headers?.cookie || '';
  const match = cookies.match(/auth_token=([^;]+)/);
  const token = match?.[1];

  if (!token) return { user: null };

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET); // Ensure this secret matches your signer
    const user = decoded?.results?.data;
    return { user };
  } catch (err) {
    console.error('JWT verification failed:', err);
    return { user: null };
  }
}



