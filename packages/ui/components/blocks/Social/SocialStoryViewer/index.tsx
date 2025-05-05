import { StoryProgressBar } from "@partials";
import React from "react";
import { SocialStoriesCarousel } from "../SocialStoriesCarousel";
import { SocialStoryType } from "../SocialStoriesModal";
import { SocialStoryViewerHeader } from "../SocialStoryViewerHeader";

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
    <div className="flex flex-col gap-2 w-full h-full">
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
