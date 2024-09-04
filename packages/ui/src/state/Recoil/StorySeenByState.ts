import { atom } from "recoil";
import { StorySeenByUserInfo } from "types";

export const StorySeenByState = atom<StorySeenByUserInfo[]>({
  key: `StorySeenByState_${Date.now()}`,
  default: [],
});

export const StorySeenByPopupOpenState = atom<boolean>({
  key: `StorySeenByPopupOpenState_${Date.now()}`,
  default: false,
});
