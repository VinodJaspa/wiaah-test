import { AuthorizationDecodedUser } from "./types";

const mockAuthorzation = true;

export function getUserFromRequest<T = Record<string, string>>(req: any): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;
  const mockedUser: Partial<AuthorizationDecodedUser> = {
    id: "62b8bae86f604a137f311608",
    email: "barco01014@gmail.com",
    accountType: "seller",
    shopId: "62b8c8cb69e68f34eb948b3f",
  };

  if (mockAuthorzation && !user) return mockedUser as any;
  return user;
}
