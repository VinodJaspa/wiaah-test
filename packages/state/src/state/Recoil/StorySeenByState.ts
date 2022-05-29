import { atom } from "recoil";
import { StorySeenByUserInfo } from "types/market/Social";

export const StorySeenByState = atom<StorySeenByUserInfo[]>({
  key: "StorySeenByState",
  default: [],
});

export const StorySeenByPopupOpenState = atom<boolean>({
  key: "StorySeenByPopupOpenState",
  default: false,
});
