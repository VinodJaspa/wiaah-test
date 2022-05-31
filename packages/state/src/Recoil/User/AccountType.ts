import { atom } from "recoil";
import { AccountType } from "types";

export const AccountTypeState = atom<AccountType>({
  default: "seller",
  key: "AccountTypeState",
});
