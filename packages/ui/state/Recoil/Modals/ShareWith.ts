import { atom } from "recoil";

export const ShareWithPostIdState = atom<string | null>({
  default: "1",
  key: "ShareWithPostIdState",
});
