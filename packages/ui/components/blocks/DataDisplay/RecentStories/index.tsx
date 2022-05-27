import React from "react";
import { HiPlus } from "react-icons/hi";
import { HtmlDivProps } from "types";
import { StoryDisplay, StoryDisplayProps } from "ui";
import { useResponsive, useNewStoryModal } from "ui";
export interface RecentStoriesProps extends HtmlDivProps {
  stories: StoryDisplayProps[];
  onNewStoryClick?: () => any;
}
const InitialStory: StoryDisplayProps[] = [
  {
    storyUserData: {
      name: "You",
      userPhotoSrc: "/person-icon.png",
    },
    floatingIcon: {
      items: [
        {
          label: (
            <div className="flex items-center justify-center h-6 w-6 text-2xl rounded-full text-white bg-primary">
              <HiPlus />
            </div>
          ),
          right: true,
          bottom: true,
        },
      ],
    },
  },
];

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  onNewStoryClick,
  className,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { openNewStoryModal } = useNewStoryModal();
  return (
    //@ts-ignore
    <div
      {...props}
      className={`${className && className} ${
        isMobile ? "gap-4" : "gap-1"
      } flex no-scrollBar`}
    >
      {InitialStory.concat(stories).map((story, i) => (
        <StoryDisplay
          innerProps={{
            onClick: () => {
              console.log(i);
              if (i === 0) openNewStoryModal();
            },
          }}
          {...story}
        />
      ))}
    </div>
  );
};
