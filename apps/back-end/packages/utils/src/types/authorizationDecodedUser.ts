export interface AuthorizationDecodedUser {
  id: string;
  accountType: AccountTypes;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}

type AccountTypes = "buyer" | "seller";
