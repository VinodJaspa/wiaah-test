import { atom } from "recoil";

export const GeneralSearchModalOpenState = atom<boolean>({
  key: `GeneralSearchModalOpenState_${Date.now()}`,
  default: false,
});
