import { atom } from "recoil";

export const NewMessageModalOpenState = atom<boolean>({
  default: false,
  key: `NewMessageModalOpenState_${Date.now()}`,
});
