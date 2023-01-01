import { atom } from "recoil";

export const GeneralSearchModalOpenState = atom<boolean>({
  key: "GeneralSearchModalOpenState",
  default: false,
});
