import React from "react";
import { HtmlDivProps } from "types";
import { FloatingContainer, FloatingContainerProps } from "ui";
import { useResponsive } from "ui";
export type StoryUserData = {
  name: string;
  userPhotoSrc: string;
};

export interface StoryDisplayProps {
  storyUserData: StoryUserData;
  seen?: boolean;
  floatingIcon?: FloatingContainerProps;
  innerProps?: HtmlDivProps;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  storyUserData,
  seen,
  floatingIcon,
  innerProps,
}) => {
  const { isMobile } = useResponsive();
  return (
    <div className="flex flex-col items-center gap-2" {...innerProps}>
      <FloatingContainer {...floatingIcon}>
        <div
          className={`${isMobile ? "w-14 h-14" : "w-40 h-40"} ${
            seen ? "p-[0.0625rem]" : "p-[0.125rem]"
          } rounded-xl bg-gradient-to-r from-primary-200 to-primary-700`}
        >
          <div className="w-full h-full rounded-xl bg-white p-[0.125rem]">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={storyUserData.userPhotoSrc}
            />
          </div>
        </div>
      </FloatingContainer>
      <span className="text-base md:text-2xl">{storyUserData.name}</span>
    </div>
  );
};
