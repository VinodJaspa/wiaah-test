import { atom } from "recoil";

export const newStoryModalOpenState = atom<boolean>({
  key: "newStoryModalOpenState",
  default: false,
});
