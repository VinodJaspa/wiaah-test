import { atom } from "recoil";

export const AddNewPostModalOpenState = atom<boolean>({
  default: false,
  key: "AddNewPostModalOpenState",
});
