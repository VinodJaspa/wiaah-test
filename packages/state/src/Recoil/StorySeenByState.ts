import { atom } from "recoil";
import { StorySeenByUserInfo } from "types";

export const StorySeenByState = atom<StorySeenByUserInfo[]>({
  key: "StorySeenByState",
  default: [],
});

export const StorySeenByPopupOpenState = atom<boolean>({
  key: "StorySeenByPopupOpenState",
  default: false,
});
