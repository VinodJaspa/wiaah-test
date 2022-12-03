import React from "react";
import { SocialStoryContentData } from "types";
import { ChakraCarousel, SocialStoryContentViewer } from "ui";
import { useStory } from "ui/Hooks";
export interface SocialStoriesCarouselProps {
  stories: SocialStoryContentData[];
}

export const SocialStoriesCarousel: React.FC<SocialStoriesCarouselProps> = ({
  stories,
}) => {
  const { currentStory, goToStory } = useStory();

  return (
    <div className="flex flex-col gap-4 w-full">
      <ChakraCarousel
        trackBgColor="blackAlpha.800"
        activeItem={currentStory}
        setActiveItem={goToStory}
        navigateOnClick
        gap={0}
      >
        {stories.map((story, i) => (
          <SocialStoryContentViewer
            play={currentStory === i}
            key={story.id}
            {...story}
          />
        ))}
      </ChakraCarousel>
    </div>
  );
};
