import { atom } from "recoil";

export const ActionCommentsOpenState = atom<boolean>({
  key: `ActionCommentsOpenState_${Date.now()}`,
  default: false,
});
