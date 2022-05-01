import { atom } from "recoil";

export const ActionCommentsOpenState = atom<boolean>({
  key: "ActionCommentsOpenState",
  default: false,
});
