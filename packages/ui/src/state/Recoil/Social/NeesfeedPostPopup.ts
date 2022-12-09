import { atom } from "recoil";

export const newsFeedPostIdState = atom<string | undefined>({
  default: undefined,
  key: "newsFeedPostIdState",
});
