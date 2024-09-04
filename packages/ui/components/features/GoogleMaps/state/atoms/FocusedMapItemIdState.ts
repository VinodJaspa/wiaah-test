import { atom } from "recoil";

export const FocusedMapItemIdState = atom<string | null>({
  key: `FocusedMapItemIdState_${Date.now()}`,
  default: null,
});
