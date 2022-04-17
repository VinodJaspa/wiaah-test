import { Avatar, Box, Flex, Icon } from "@chakra-ui/react";
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

let timeout: NodeJS.Timer;
export const SocialStoryViewer: React.FC<SocialStoryViewerProps> = ({
  stories,
  user,
}) => {
  const { currentStory } = useStory();
  if (stories.length < 1) return null;
  const story = stories[currentStory];
  const { storyCreationDate, storyViews } = story;
  console.log("render");

  if (!story) return null;

  return (
    <Flex gap="1rem" w="100%" direction={"column"}>
      <SocialStoryViewerHeader
        // onClose={CloseStories}
        user={user}
        createdAt={storyCreationDate}
        views={storyViews}
      />
      <StorySeenByPopup />
      <StoiresProgressBars />
      <SocialStoriesCarousel stories={stories} />
    </Flex>
  );
};
