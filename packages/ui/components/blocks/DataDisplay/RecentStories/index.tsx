import React from "react";
import { HiPlus } from "react-icons/hi";
import { HtmlDivProps } from "types";
import { StoryDisplay, StoryDisplayProps } from "ui";
import { useResponsive, useNewStoryModal } from "ui";
export interface RecentStoriesProps extends HtmlDivProps {
  stories: StoryDisplayProps[];
  onNewStoryClick?: () => any;
}

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  onNewStoryClick,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { openNewStoryModal } = useNewStoryModal();
  return (
    <div
      {...props}
      className={`${className || ""} ${
        isMobile ? "gap-4" : "gap-6"
      } flex no-scrollBar `}
    >
      {stories.map((story, i) => (
        <div className="w-[4.75rem]">
          <StoryDisplay {...story} />
        </div>
      ))}
    </div>
  );
};
