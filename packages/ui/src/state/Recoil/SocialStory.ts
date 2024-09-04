import { atom, selector } from "recoil";
import { ProgressBar } from "types";
import {
  SocialStoryData,
  SocialStoryDataWithUser,
  StorySeenByUserInfo,
} from "types";

export const SocialStoryOpenState = atom<boolean>({
  key: `SocialStoryOpenState_${Date.now()}`,
  default: false,
});

export const SocialNewStoryState = atom<boolean>({
  key: `SocialNewStoryState_${Date.now()}`,
  default: false,
});

export const SocialStoryState = atom<SocialStoryDataWithUser | null>({
  key: `SocialStoryState_${Date.now()}`,
  default: null,
});

export const CurrentStoryIndexState = atom<number>({
  key: `CurrentStoryIndexState_${Date.now()}`,
  default: 0,
});
export const CurrentStoryProgressState = atom<number>({
  key: `CurrentStoryProgressState_${Date.now()}`,
  default: 0,
});

export const SocialStoriesState = atom<SocialStoryData[]>({
  key: `SocialStoriesData_${Date.now()}`,
  default: [],
});

export const SocialStoriesProgressBarDataState = selector<ProgressBar[]>({
  key: `SocialStoriesProgressBarData_${Date.now()}`,
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
