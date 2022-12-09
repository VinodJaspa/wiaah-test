import { atom } from "recoil";

export const shopPostPopupIdState = atom<string | undefined>({
  default: undefined,
  key: "shopPostPopupIdState",
});
