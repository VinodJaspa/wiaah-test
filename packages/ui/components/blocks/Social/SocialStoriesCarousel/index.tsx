import React from "react";
import { SocialStoryContentData, SocialStoryData } from "types";
import { SocialStoryContentViewer } from "../SocialStoryContentViewer";
import { Slider } from "@partials";

export interface SocialStoriesCarouselProps {
  story: SocialStoryData;
  next: (story: SocialStoryData) => any;
  prev: (story: SocialStoryData) => any;
}

export const SocialStoriesCarousel: React.FC<SocialStoriesCarouselProps> = ({
  next,
  story,
  prev,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Slider>
        <SocialStoryContentViewer play={true} {...story} />
      </Slider>
    </div>
  );
};
