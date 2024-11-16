import React from "react";
import { SocialStoryData } from "types";
import { SocialStoryContentViewer } from "../SocialStoryContentViewer";
import { Slider, Spinner } from "@partials";
import { Story } from "@features/API";
import { SocialStoryType } from "../SocialStoriesModal";

export interface SocialStoriesCarouselProps {
  story: SocialStoryType;
  next: (story: SocialStoryType) => any;
  prev: (story: SocialStoryType) => any;
}

export const SocialStoriesCarousel: React.FC<SocialStoriesCarouselProps> = ({
  next,
  story,
  prev,
}) => {
  const [slideIdx, setSlideIdx] = React.useState<number>(1);

  function handleSlideChange(newIdx: number) {
    if (newIdx > 1) {
      next(story);
      setSlideIdx(2);
    } else if (newIdx < 1) {
      prev(story);
      setSlideIdx(0);
    }
  }

  React.useEffect(() => {
    setSlideIdx(1);
  }, [story]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <SocialStoryContentViewer
        play={true}
        id={story.id}
        type={story.type}
        src={story.attachements?.src || ""}
        text={story.content || ""}
      />
    </div>
  );
};
