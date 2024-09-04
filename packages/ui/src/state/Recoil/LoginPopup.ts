import { atom } from "recoil";

export const LoginPopupState = atom<boolean>({
  key: `LoginPopupState${Date.now()}`,
  default: false,
});
