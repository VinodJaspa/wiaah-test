import { atom } from "recoil";

export const userInputState = atom<Record<string, any>>({
  default: {},
  key: `userInputState_${Date.now()}`,
});
