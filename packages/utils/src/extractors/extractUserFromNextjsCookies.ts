import { AuthorizationDecodedUser } from "nest-utils";

export const extractUserfromNextjsCookies = async (
  cookies: Record<string, any>
): Promise<AuthorizationDecodedUser> => {
  return {
    id: "135",
    accountType: "seller",
    email: "test",
    firstName: "name",
    lastName: "last",
    shopId: "1321",
  } as AuthorizationDecodedUser;
};
