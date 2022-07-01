import { AccountType } from "./accountTypes";

export interface AuthorizationDecodedUser {
  id: string;
  shopId: string | null;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}
