import React from "react";
import { HtmlDivProps } from "types";
import { UserProfileDisplay } from "../StoryDisplay";
import { useResponsive } from "hooks";
import { SocialStoryType } from "@blocks/Social";
import { useShowStoryModal } from "@features/Social/components/Modals/StoryModal";
export interface RecentStoriesProps extends HtmlDivProps {
  stories: SocialStoryType[];
}

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();

  const { OpenModal } = useShowStoryModal();

  return (
    <div
      onClick={() => {
        console.log("OPEN STORY");
        OpenModal("5");
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
