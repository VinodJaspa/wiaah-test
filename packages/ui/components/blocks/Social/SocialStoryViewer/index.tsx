import React from "react";
import { ProfileInfo, SocialStoryData } from "types";
import {
  SocialStoryViewerHeader,
  StorySeenByPopup,
  StoiresProgressBars,
  SocialStoriesCarousel,
} from "ui";
import { useStory } from "ui/Hooks";

export interface SocialStoryViewerProps {
  user: ProfileInfo;
  stories: SocialStoryData[];
}

export const SocialStoryViewer: React.FC<SocialStoryViewerProps> = ({
  stories,
  user,
}) => {
  try {
    const { currentStory, CloseStories } = useStory();
    if (stories.length < 1) return null;
    const story = stories[currentStory];

    const { storyCreationDate, storyViews } = story;

    if (!story) return null;

    return (
      <div className="flex flex-col gap-4 max-h-[100%] max-w-[100%]">
        <SocialStoryViewerHeader
          // onClose={CloseStories}
          user={user}
          createdAt={storyCreationDate}
          views={storyViews}
        />
        <StorySeenByPopup storyId={story.id} />
        <StoiresProgressBars />
        <SocialStoriesCarousel stories={stories} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
