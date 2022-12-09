import React from "react";
import { ProfileInfo, ProgressBar } from "types";
import { SocialStoryViewerHeader } from "../SocialStoryViewerHeader";
import {
  SocialStoriesCarousel,
  SocialStoriesCarouselProps,
} from "../SocialStoriesCarousel";
import { ProgressBars } from "@partials";

export interface SocialStoryViewerProps extends SocialStoriesCarouselProps {
  user: ProfileInfo;
}

export const SocialStoryViewer: React.FC<SocialStoryViewerProps> = ({
  story,
  user,
  ...props
}) => {
  try {
    return (
      <div className="flex flex-col gap-4 max-h-[100%] max-w-[100%]">
        <SocialStoryViewerHeader
          storyId={story.id}
          user={user}
          createdAt={story.storyCreationDate}
          views={story.storyViews}
        />
        <ProgressBars srcKey={user.id} />
        <SocialStoriesCarousel {...props} story={story} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
