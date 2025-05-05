import React from "react";
import { SocialStoryFields } from "../SocialStoriesModal";
import { SocialStoryContentViewer } from "../SocialStoryContentViewer";

export interface SocialStoriesCarouselProps {
  story: SocialStoryFields;
}

export const SocialStoriesCarousel: React.FC<SocialStoriesCarouselProps> = ({
  story,
}) => {
  const [slideIdx, setSlideIdx] = React.useState<number>(1);

  // function handleSlideChange(newIdx: number) {
  //   if (newIdx > 1) {
  //     next(story);
  //     setSlideIdx(2);
  //   } else if (newIdx < 1) {
  //     prev(story);
  //     setSlideIdx(0);
  //   }
  // }

  React.useEffect(() => {
    setSlideIdx(1);
  }, [story]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <SocialStoryContentViewer
        play={true}
        id={story.id}
        type={story.type}
        src={story.attachements?.src || ""}
        text={story.content || ""}
        post={story.newsfeedPost || story.servicePost || story.shopPost}
      />
    </div>
  );
};
