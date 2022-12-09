import { atom } from "recoil";

export const EditProductState = atom<string | null | undefined>({
  key: "EditProductState",
  default: undefined,
});
