import { mockedUser } from "./test";
import { AuthorizationDecodedUser } from "./types";

const mockAuthorzation = true;

export function getUserFromRequest<T = AuthorizationDecodedUser>(req: any): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;

  if (mockAuthorzation && !user) return mockedUser as any;
  return user;
}
