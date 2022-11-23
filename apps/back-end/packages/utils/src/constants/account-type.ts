import { AccountType } from "../types";

function createAccountType<T extends { [key: string]: AccountType }>(
  cfg: T
): Record<keyof T, AccountType> {
  return cfg;
}

export const accountType = createAccountType({
  SELLER: "seller",
  BUYER: "buyer",
  ADMIN: "admin",
});
