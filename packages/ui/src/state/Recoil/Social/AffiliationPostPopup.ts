import { atom } from "recoil";

export const AffiliationPostIdState = atom<string | undefined>({
  key: "AffiliationPostIdState",
  default: undefined,
});
