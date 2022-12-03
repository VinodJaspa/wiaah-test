import { AuthorizationDecodedUser } from "nest-utils";

export const extractUserfromNextjsCookies = async (
  cookies: Record<string, any>,
  test: boolean = false
): Promise<AuthorizationDecodedUser | null> => {
  const user = {
    id: "135",
    accountType: "seller",
    email: "test",
    firstName: "name",
    lastName: "last",
    shopId: "1321",
  } as AuthorizationDecodedUser;

  return test ? user : null;
};
