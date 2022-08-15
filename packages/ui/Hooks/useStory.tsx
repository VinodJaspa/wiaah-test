import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ProgressBar } from "types";
import { SocialStoryData } from "types";
import {
  SocialStoryOpenState,
  SocialNewStoryState,
  CurrentStoryIndexState,
  CurrentStoryProgressState,
  SocialStoriesState,
} from "ui/state";

export interface useStoryReturns {
  storiesOpen: boolean;
  newStory: boolean;
  currentStory: number;
  stories: SocialStoryData[];
  currentStoryData: SocialStoryData;
  setStories: (stories: SocialStoryData[]) => void;
  goToStory: (storyIndex: number) => void;
  isNewStory: () => void;
  removeNewStory: () => void;
  OpenStories: () => void;
  CloseStories: () => void;
  setCurrentStoryProgress: (progress: number) => void;
  nextStory: () => void;
  prevStory: () => void;
}

export const useStory = (): useStoryReturns => {
  const [storiesOpen, setStoriesOpen] = useRecoilState(SocialStoryOpenState);
  const [newStory, setNewStory] = useRecoilState(SocialNewStoryState);
  const [currentStory, setCurrentStory] = useRecoilState(
    CurrentStoryIndexState
  );
  const [stories, setCurrentStories] = useRecoilState(SocialStoriesState);

  const currentStoryData = stories[currentStory];
  console.log("hook");
  function nextStory() {
    if (stories.length > currentStory + 1 && storiesOpen) {
      goToStory(currentStory + 1);
    } else {
      goToStory(0);
    }
  }
  function prevStory() {
    if (0 > currentStory - 1) {
      goToStory(currentStory - 1);
    }
  }

  function setStories(stories: SocialStoryData[]) {
    setCurrentStories(stories);
  }

  function setCurrentStoryProgress(progress: number) {}

  function isNewStory() {
    setNewStory(true);
  }
  function removeNewStory() {
    setNewStory(false);
  }

  function OpenStories() {
    setStoriesOpen(true);
  }

  function CloseStories() {
    goToStory(0);
    setStoriesOpen(false);
  }

  function goToStory(storyIndex: number) {
    setCurrentStoryProgress(0);
    setCurrentStory(storyIndex);
  }

  return {
    storiesOpen,
    newStory,
    currentStory,
    stories,
    currentStoryData,
    setStories,
    OpenStories,
    CloseStories,
    isNewStory,
    removeNewStory,
    goToStory,
    setCurrentStoryProgress,
    nextStory,
    prevStory,
  };
};
