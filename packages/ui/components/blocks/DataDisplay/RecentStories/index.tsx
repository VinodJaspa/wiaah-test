import React from "react";
import { HtmlDivProps } from "types";
import { UserProfileDisplay } from "../StoryDisplay";
import { useResponsive } from "hooks";
import { SocialStoryType, useStoryModal } from "@blocks/Social";
export interface RecentStoriesProps extends HtmlDivProps {
  stories: SocialStoryType[];
}

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();

  const { OpenModal } = useStoryModal();

  return (
    <div
      onClick={() => {
        OpenModal("0");
      }}
      {...props}
      className={`${className || ""} ${isMobile ? "gap-4" : "gap-6"
        } flex no-scrollBar `}
    >
      {stories.map((story, i) => (
        <div className="w-[4.75rem]" key={i}>
          <UserProfileDisplay story={story} />
        </div>
      ))}
    </div>
  );
};
