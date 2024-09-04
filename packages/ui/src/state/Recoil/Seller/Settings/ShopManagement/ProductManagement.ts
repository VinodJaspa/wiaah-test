import { atom } from "recoil";

export const EditProductState = atom<string | null | undefined>({
  key: `EditProductState_${Date.now()}`,
  default: undefined,
});
