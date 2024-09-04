import { atom } from "recoil";

export const ShareWithPostIdState = atom<string | null>({
  default: null,
  key: `ShareWithPostIdState_${Date.now()}`,
});
