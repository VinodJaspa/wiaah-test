import { atom } from "recoil";

export const LoginPopupState = atom<boolean>({
  key: "LoginPopupState",
  default: false,
});
