import { atom } from "recoil";

export const postsCommentsPostIdState = atom<string | undefined>({
  default: undefined,
  key: "postsCommentsPostIdState",
});
