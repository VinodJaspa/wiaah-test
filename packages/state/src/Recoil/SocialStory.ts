import { atom, selector } from "recoil";
import { ProgressBar } from "types";
import {
  SocialStoryData,
  SocialStoryDataWithUser,
  StorySeenByUserInfo,
} from "types";

export const SocialStoryOpenState = atom<boolean>({
  key: "SocialStoryOpenState",
  default: false,
});

export const SocialNewStoryState = atom<boolean>({
  key: "SocialNewStoryState",
  default: false,
});

export const SocialStoryState = atom<SocialStoryDataWithUser | null>({
  key: "SocialStoryState",
  default: null,
});

export const CurrentStoryIndexState = atom<number>({
  key: "CurrentStoryIndexState",
  default: 0,
});
export const CurrentStoryProgressState = atom<number>({
  key: "CurrentStoryProgressState",
  default: 0,
});

export const SocialStoriesState = atom<SocialStoryData[]>({
  key: "SocialStoriesData",
  default: [],
});

export const SocialStoriesProgressBarDataState = selector<ProgressBar[]>({
  key: "SocialStoriesProgressBarData",
  get: ({ get }) => {
    const stories = get(SocialStoriesState);
    const currentStory = get(CurrentStoryIndexState);
    const currentProgress = get(CurrentStoryProgressState);
    return stories.map((_, i) => ({
      progress:
        currentStory > i ? 100 : currentStory === i ? currentProgress : 0,
    }));
  },
});
