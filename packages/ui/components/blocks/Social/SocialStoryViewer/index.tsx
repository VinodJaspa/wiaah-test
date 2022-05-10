import { Flex } from "@chakra-ui/react";
import React from "react";
import { ProfileInfo, SocialStoryData } from "types/market/Social";
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
      <Flex gap="1rem" maxH={"100%"} maxW="100%" direction={"column"}>
        <SocialStoryViewerHeader
          // onClose={CloseStories}
          user={user}
          createdAt={storyCreationDate}
          views={storyViews}
        />
        <StorySeenByPopup storyId={story.id} />
        <StoiresProgressBars />
        <SocialStoriesCarousel stories={stories} />
      </Flex>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
