import React from "react";
import { ProfileInfo } from "types";
import { SocialStoryViewerHeader } from "../SocialStoryViewerHeader";
import {
  SocialStoriesCarousel,
  SocialStoriesCarouselProps,
} from "../SocialStoriesCarousel";
import { ProgressBars } from "@partials";

export interface SocialStoryViewerProps extends SocialStoriesCarouselProps {
  user: { name: string; thumbnail: string; id: string };
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
          createdAt={story.createdAt}
          views={story.viewsCount}
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
