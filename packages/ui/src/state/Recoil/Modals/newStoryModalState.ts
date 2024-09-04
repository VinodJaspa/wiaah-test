import { atom } from "recoil";

export const newStoryModalOpenState = atom<boolean>({
  key: `newStoryModalOpenState_${Date.now()}`,
  default: false,
});
