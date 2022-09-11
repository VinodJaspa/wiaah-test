import React from "react";
import { HtmlDivProps } from "types";
import { FloatingContainer, FloatingContainerProps } from "ui";
import { useResponsive, AspectRatio } from "ui";
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

export const UserProfileDisplay: React.FC<StoryDisplayProps> = ({
  storyUserData,
  seen,
  floatingIcon,
  innerProps,
}) => {
  return (
    <FloatingContainer className="w-full" {...floatingIcon}>
      <div
        className={`${
          seen ? "p-[0.0625rem]" : "p-[0.20rem]"
        } rounded-[20%] bg-gradient-to-b from-primary to-blue-400`}
      >
        <div className="w-full h-full overflow-hidden rounded-[20%] bg-white p-[0.125rem]">
          <AspectRatio ratio={1}>
            <img
              className="w-full h-full rounded-[20%] object-cover"
              src={storyUserData.userPhotoSrc}
            />
          </AspectRatio>
        </div>
      </div>
    </FloatingContainer>
  );
};
