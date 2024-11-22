import React from "react";
import { SocialStoryViewerHeader } from "../SocialStoryViewerHeader";
import {
  SocialStoriesCarousel,
  SocialStoriesCarouselProps,
} from "../SocialStoriesCarousel";
import {
  DisplayPostedSince,
  HStack,
  ProgressBars,
  StoryProgressBar,
} from "@partials";
import { SocialStoryType, useStoryModal } from "../SocialStoriesModal";
import { HiEye } from "react-icons/hi";
import { NumberShortner } from "@UI/components/helpers";

export interface SocialStoryViewerProps {
  stories: SocialStoryType; // An array of stories, not just a single object
  user: { name: string; thumbnail: string; id: string };
  id: string;
  onClose: () => void;
}

export const SocialStoryViewer: React.FC<SocialStoryViewerProps> = ({
  stories,
  user,
  id,
  onClose,
  ...props
}) => {
  const storyComponents = stories.stories.map((story) => ({
    component: <SocialStoriesCarousel {...props} story={story} />, // Story component
    storyData: {
      views: story.views.length, // or the actual value for views
      createdAt: story.createdAt, // or the actual value for createdAt
    },
  }));

  if (!stories || !stories.stories || stories.stories.length === 0) {
    return null; // Return nothing if no stories exist
  }

  return (
    <div className="flex flex-col gap-2 max-h-[100%] max-w-[100%]">
      {/* Header Section */}
      <SocialStoryViewerHeader user={user} onClose={() => onClose()} />
      {/* Story Progress Bar Section */}
      {id && (
        <StoryProgressBar
          duration={3000}
          onClose={onClose}
          stories={storyComponents}
        />
      )}
    </div>
  );
};
