import { AccountType } from "./accountTypes";

export interface AuthorizationDecodedUser {
  id: string;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}
