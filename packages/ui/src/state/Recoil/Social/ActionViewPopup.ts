import { atom } from "recoil";

export const ActionViewIdState = atom<string | undefined>({
  default: undefined,
  key: "ActionViewIdState",
});
