import React from "react";
import { HtmlDivProps } from "types";
import { UserProfileDisplay, StoryDisplayProps } from "../StoryDisplay";
import { useResponsive } from "hooks";
export interface RecentStoriesProps extends HtmlDivProps {
  stories: StoryDisplayProps[];
  onStoryClick?: (story: StoryDisplayProps) => any;
}

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  onStoryClick,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();
  return (
    <div
      {...props}
      className={`${className || ""} ${
        isMobile ? "gap-4" : "gap-6"
      } flex no-scrollBar `}
    >
      {stories.map((story, i) => (
        <div className="w-[4.75rem]">
          <UserProfileDisplay
            onProfileClick={() => onStoryClick && onStoryClick(story)}
            {...story}
          />
        </div>
      ))}
    </div>
  );
};
