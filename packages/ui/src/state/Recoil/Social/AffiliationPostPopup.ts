import { atom } from "recoil";

export const AffiliationPostIdState = atom<string | undefined>({
  key: `AffiliationPostIdState_${Date.now()}`,
  default: undefined,
});
