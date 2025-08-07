// recoil/accountState.ts
import { atom } from "recoil";

export type AccountInfoType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  verified: boolean;
  online: boolean;
  status: string;
  accountType: string;
  gender: string;
  sales: number;
  birthDate: string;
  photo?: string;
  lang: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
};

export const accountInfoState = atom<AccountInfoType | null>({
  key: "accountInfoState",
  default: null,
});
